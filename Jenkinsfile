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
    }
}