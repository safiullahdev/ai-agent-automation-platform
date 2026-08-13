pipeline {
    agent any

    tools {
        nodejs 'NodeJS 26.5.1'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ai-agent-automation-platform:int .'
            }
        }

        stage('Deploy to INT') {
            steps {
                sh 'docker stop aiap-int || true'
                sh 'docker rm aiap-int || true'
                sh 'docker run -d --name aiap-int -p 3001:3000 ai-agent-automation-platform:int'
                sh 'sleep 5'
            }
        }

        stage('Verify INT Health') {
            steps {
                sh 'curl --fail http://host.docker.internal:3001/health'
            }
        }

        stage('Verify INT Web UI') {
            steps {
                sh 'curl --fail http://host.docker.internal:3001/'
            }
        }

        stage('Checkout Playwright Tests') {
            steps {
                dir('aiap-playwright-tests') {
                    git branch: 'main',
                        credentialsId: 'github-aiap-playwright',
                        url: 'https://github.com/safiullahdev/aiap-playwright-tests.git'
                }
            }
        }
        stage('Run Playwright Smoke Test') {
            steps {
                dir('aiap-playwright-tests') {
                    sh '''
                        docker build -t aiap-playwright-tests .
                        docker run --rm \
                        aiap-playwright-tests \
                        pytest tests/test_smoke.py \
                        --base-url http://host.docker.internal:3001
                    '''
                }
            }
        }
        stage('Promote to TEST') {
            steps {
                echo 'Promoting AIAP to TEST environment'
            }
        }
    }
}
