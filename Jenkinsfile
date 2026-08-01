pipeline {
    agent any

    tools {
        nodejs 'NodeJS 26.5.1'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
    }
}