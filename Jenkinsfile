pipeline {
    agent any

    environment {
        CYPRESS_currentEnv = 'qa'
        CI = 'true'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Debug Workspace') {
            steps {
                sh '''
                  echo "Workspace:"
                  pwd
                  ls -la
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                ansiColor('xterm') {
                    sh '''
                      node -v
                      npm -v
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

        stage('Debug Report Files') {
            steps {
                sh '''
                  echo "=== Reports folder ==="
                  ls -la reports || true

                  echo "=== index.html size ==="
                  wc -c reports/index.html || true

                  echo "=== First 20 lines of index.html ==="
                  head -n 20 reports/index.html || true
                '''
            }
        }

        stage('Publish Cypress Report') {
            steps {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports',
                    reportFiles: 'index.html',
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
