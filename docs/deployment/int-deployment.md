# INT Deployment Process

## Overview

The AI Agent Automation Platform uses Jenkins and Docker to build, deploy, and verify the application in the INT environment.

The current INT environment runs locally using Docker Desktop.

## Environment URLs

- Jenkins: http://localhost:8080
- INT Application: http://localhost:3000
- INT Health Check: http://localhost:3000/health

## Deployment Architecture

```text
Developer
   ↓
GitHub
   ↓
Jenkins
   ↓
Install Dependencies
   ↓
Lint
   ↓
Build
   ↓
Unit Tests
   ↓
Build Docker Image
   ↓
Deploy to INT
   ↓
Verify INT Health
   ↓
Verify INT Web UI