# Jenkins, Docker, and Security Pipeline Architecture

## Overview

The AI Agent Automation Platform (AIAP) uses Jenkins and Docker to automate the CI/CD pipeline.

The pipeline performs dependency scanning, secret scanning, code validation, testing, Docker image creation, deployment to the INT environment, and automated smoke testing.

High-level flow:

```text
Developer
   |
   v
GitHub
   |
   v
Jenkins
   |
   +--> Install Dependencies
   |
   +--> SCA Dependency Scan
   |
   +--> Secret Scan
   |
   +--> Lint
   |
   +--> Build
   |
   +--> Tests
   |
   +--> Build Docker Image
   |
   +--> Deploy to INT
   |
   +--> Verify INT
   |
   +--> Playwright Smoke Test
   |
   v
Promote to TEST
```

---

## Jenkinsfile

The `Jenkinsfile` defines **what Jenkins executes** during the CI/CD pipeline.

Example:

```groovy
stage('SCA Dependency Scan') {
    steps {
        sh 'npm audit --audit-level=high'
    }
}

stage('Secret Scan') {
    steps {
        sh 'gitleaks dir . --config .gitleaks.toml'
    }
}
```

The Jenkinsfile tells Jenkins to execute these commands.

It does not install the tools themselves.

For example:

```text
Jenkinsfile
     |
     v
"Run Gitleaks"
     |
     v
Gitleaks must already exist
inside the Jenkins environment
```

---

## Dockerfile.jenkins

`Dockerfile.jenkins` defines **how the Jenkins Docker image is built and what tools are available inside it**.

The AIAP Jenkins image is based on:

```dockerfile
FROM jenkins/jenkins:lts-jdk21
```

Additional tools required by the pipeline are installed in this image, including:

- Docker CLI
- Gitleaks
- curl
- supporting Linux packages

Example architecture:

```text
Dockerfile.jenkins
        |
        v
docker build
        |
        v
aiap-jenkins-docker
        |
        v
Jenkins Container
        |
        +--> Jenkins
        +--> Docker CLI
        +--> Gitleaks
```

### Jenkinsfile vs Dockerfile.jenkins

```text
Jenkinsfile
    =
WHAT Jenkins should execute

Dockerfile.jenkins
    =
WHAT exists inside the Jenkins environment
```

For example:

```text
Dockerfile.jenkins
      |
      +--> installs Gitleaks
                |
                v
Jenkinsfile
      |
      +--> executes Gitleaks
```

---

## SCA Dependency Scanning

AIAP uses `npm audit` for Software Composition Analysis (SCA).

The Jenkins stage runs:

```bash
npm audit --audit-level=high
```

This checks project dependencies for known vulnerabilities.

Pipeline flow:

```text
package-lock.json
      |
      v
npm audit
      |
      v
Known dependency vulnerabilities?
      |
   +--+--+
   |     |
  YES    NO
   |     |
   v     v
 FAIL   PASS
```

A high-severity dependency vulnerability can therefore prevent the pipeline from continuing.

---

## Secret Scanning with Gitleaks

AIAP uses Gitleaks to detect secrets that may accidentally be committed or placed in source files.

The Jenkins pipeline executes:

```bash
gitleaks dir . --config .gitleaks.toml
```

The configuration is stored in:

```text
.gitleaks.toml
```

Example:

```toml
[extend]
useDefault = true

[[rules]]
id = "aiap-test-secret"
description = "Detect AIAP test secret"
regex = '''AIAP_SECRET_[A-Z0-9]{16}'''
```

`useDefault = true` keeps the standard Gitleaks detection rules.

AIAP-specific rules can be added in addition to the default rules.

```text
Source Code
     |
     v
Gitleaks
     |
     +--> Default Gitleaks Rules
     |
     +--> AIAP Custom Rules
     |
     v
Secret detected?
   /       \
 YES       NO
  |         |
  v         v
FAIL       PASS
```

The custom test pattern is not a real secret. It provides a controlled way to verify that secret detection works.

---

## Why Gitleaks Must Be Installed in Jenkins

Installing Gitleaks on the developer's Windows machine does not automatically make it available inside Jenkins.

The environments are separate:

```text
Windows Host
|
+-- Gitleaks installed locally
|
+-- Docker
      |
      +-- Jenkins Container
             |
             +-- Separate environment
```

Therefore Gitleaks was also added to `Dockerfile.jenkins`.

This allows:

```bash
gitleaks version
```

and the Jenkins Secret Scan stage to execute inside the Jenkins container.

---

## Docker CLI and Docker Engine

The Jenkins pipeline needs to execute commands such as:

```bash
docker build
docker stop
docker rm
docker run
```

The Docker CLI is installed inside the Jenkins container.

However, the Docker CLI itself does not create containers.

It communicates with the Docker Engine.

```text
Jenkins
   |
   v
Docker CLI
   |
   v
Docker Engine
   |
   +--> Build Images
   +--> Start Containers
   +--> Stop Containers
   +--> Remove Containers
```

---

## Docker Socket

The Jenkins container communicates with the host Docker Engine through:

```text
/var/run/docker.sock
```

The socket is mounted into the Jenkins container when it starts:

```bash
-v /var/run/docker.sock:/var/run/docker.sock
```

Architecture:

```text
Jenkins Container
       |
       | docker build / run / stop
       v
Docker CLI
       |
       v
/var/run/docker.sock
       |
       v
Host Docker Engine
       |
       +-------------------+
       |                   |
       v                   v
 AIAP INT Container   Other Containers
```

This allows Jenkins to control Docker without running another Docker Engine inside the Jenkins container.

---

## Linux Users and Groups

The Jenkins process runs as the Linux user:

```text
uid=1000(jenkins)
gid=1000(jenkins)
groups=1000(jenkins)
```

The Docker socket was configured as:

```text
srw-rw---- root root /var/run/docker.sock
```

The important permissions are:

```text
             Owner     Group     Others
              root      root
Read           Yes       Yes       No
Write          Yes       Yes       No
```

The Jenkins user was originally:

```text
User:  jenkins
Group: jenkins
```

Therefore:

```text
jenkins
   |
   X
   |
/var/run/docker.sock
```

Jenkins did not have permission to communicate with Docker.

This caused:

```text
permission denied while trying to connect to the Docker API
```

---

## Docker Socket Permission Solution

The Jenkins container was recreated with:

```bash
--group-add 0
```

Before:

```text
uid=1000(jenkins)
gid=1000(jenkins)
groups=1000(jenkins)
```

After:

```text
uid=1000(jenkins)
gid=1000(jenkins)
groups=1000(jenkins),0(root)
```

Code-level permission relationship:

```text
Docker Socket
/var/run/docker.sock
        |
        +-- Owner = root
        |      rw
        |
        +-- Group = root
               rw
                ^
                |
                |
        Jenkins Process
        user = jenkins
        groups =
          jenkins
          root
```

Because Jenkins belongs to a group with read/write permission on the socket, the Jenkins process can communicate with Docker.

It can then execute:

```text
docker ps
docker build
docker stop
docker rm
docker run
```

### Security Note

Access to the Docker socket is highly privileged.

A process that can control the Docker Engine can potentially create privileged containers and access host resources.

The current configuration is designed for the local AIAP development and learning environment. A production CI/CD environment should use an appropriately secured runner and Docker access model.

---

## Jenkins Persistent Storage

Jenkins stores its jobs, configuration, plugins, and other persistent data under:

```text
/var/jenkins_home
```

AIAP uses the Docker volume:

```text
jenkins_home
```

The mount is:

```text
jenkins_home:/var/jenkins_home
```

Architecture:

```text
Jenkins Container
       |
       v
/var/jenkins_home
       |
       v
Docker Volume
jenkins_home
```

The container and the data therefore have different lifecycles.

```text
Stop Jenkins Container
        |
        v
Remove Jenkins Container
        |
        |     jenkins_home still exists
        v
Create New Jenkins Container
        |
        v
Mount jenkins_home
        |
        v
Existing Jenkins data available
```

This allowed the Jenkins container to be rebuilt to include Gitleaks without intentionally deleting the existing Jenkins configuration.

---

## Complete AIAP CI/CD Architecture

```text
                    Developer
                        |
                        v
                     GitHub
                        |
                        v
                Jenkins Container
                        |
        +---------------+---------------+
        |                               |
        v                               v
   Jenkinsfile                  Dockerfile.jenkins
        |                               |
        |                       Defines Jenkins
        |                       runtime/tools
        |                               |
        |                    +----------+----------+
        |                    |                     |
        |                 Gitleaks             Docker CLI
        |                    |                     |
        v                    |                     |
Install Dependencies         |                     |
        |                    |                     |
        v                    |                     |
    npm audit                |                     |
   SCA Gate                  |                     |
        |                    |                     |
        v                    |                     |
    Gitleaks <---------------+                     |
 Secret Scan                                       |
        |                                          |
        v                                          |
      Lint                                         |
        |                                          |
        v                                          |
      Build                                        |
        |                                          |
        v                                          |
      Tests                                        |
        |                                          |
        v                                          |
 Docker Build ------------------------------------>+
                                                   |
                                                   v
                                         /var/run/docker.sock
                                                   |
                                                   v
                                            Docker Engine
                                                   |
                                                   v
                                            AIAP INT Container
                                                   |
                                      +------------+------------+
                                      |                         |
                                      v                         v
                                Health Check                Web UI Check
                                      |                         |
                                      +------------+------------+
                                                   |
                                                   v
                                         Playwright Smoke Test
                                                   |
                                                   v
                                            Promote to TEST
```

---

## AIAP Security Gates

The pipeline currently contains two security-focused checks:

```text
                 CI/CD Pipeline
                       |
          +------------+------------+
          |                         |
          v                         v
     SCA Scanning              Secret Scanning
      npm audit                  Gitleaks
          |                         |
          v                         v
Dependency vulnerabilities     Exposed secrets
```

These checks run before deployment so security problems can stop the pipeline before the application reaches the INT environment.

---

## Verification

The implementation was verified through Jenkins.

Successful pipeline execution confirmed:

- Dependency installation completed
- SCA scan reported zero vulnerabilities
- Gitleaks secret scan reported no leaks
- Lint passed
- TypeScript build passed
- 35 automated tests passed
- Docker image built successfully
- Application deployed to INT
- INT health endpoint returned `UP`
- INT Web UI responded successfully
- Playwright smoke test passed
- Pipeline reached the Promote to TEST stage

---

## Key Takeaways

1. `Jenkinsfile` defines the CI/CD pipeline steps.
2. `Dockerfile.jenkins` defines the Jenkins runtime environment and installed tools.
3. Gitleaks provides secret scanning as a CI/CD security gate.
4. `npm audit` provides dependency vulnerability scanning.
5. Docker CLI sends commands to the Docker Engine.
6. `/var/run/docker.sock` provides the communication path to the Docker Engine.
7. Linux user/group permissions determine whether Jenkins can access the Docker socket.
8. `jenkins_home` keeps Jenkins data persistent when the container is recreated.
9. Security scans should run before application deployment.
10. A successful pipeline validates the complete path from source code through security checks, testing, Docker deployment, and INT verification.