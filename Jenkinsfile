pipeline {
    agent any

    environment {
        CYPRESS_currentEnv = 'qa'
        CI = 'true'
    }

    stages {

      stage('Debug Workspace') {
    steps {
        sh '''
          echo "Current directory:"
          pwd

          echo "Workspace contents:"
          ls -la

          echo "Check package-lock.json:"
          ls -la package-lock.json || echo "❌ package-lock.json NOT FOUND"
        '''
    }
}
 stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Debug Workspace') {
            steps {
                sh 'ls -la'
            }
        }

        stage('Install Dependencies') {
            steps {
                ansiColor('xterm') {
                    sh '''
                      npm ci
                    '''
                }
            }
        }

        stage('Run Cypress API Tests') {
            environment {
                CYPRESS_QA_USERNAME = credentials('qa-username')
                CYPRESS_QA_PASSWORD = credentials('qa-password')
            }

            steps {
                ansiColor('xterm') {
                    sh '''
                      npx cypress run --browser electron --headless
                    '''
                }
            }
        }

        stage('Publish Cypress Report') {
            steps {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports/mochawesome',
                    reportFiles: '*.html',
                    reportName: 'Cypress API Test Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**', fingerprint: true
            cleanWs()
        }
    }
}
