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
    }
}