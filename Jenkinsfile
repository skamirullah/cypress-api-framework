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
                        npx cypress run \
                            --env CI=true \
                            --browser electron \
                            --headless \
                            --config-file cypress.config.js
                        '''
                }
            }
        }

        stage('Debug Allure Results') {
            steps {
                    sh '''
                    echo "Allure results content:"
                    ls -la allure-results || true
                    echo "Allure JSON preview:"
                    head -n 20 allure-results/*.json || true
                    '''
            }
      }

        stage('Publish Reports') {
            steps {
                script {
                    if (!env.CI) {
                        // Local / non-CI (Mochawesome)
                        publishHTML(target: [
                            allowMissing: true,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'reports',
                            reportFiles: 'index.html',
                            reportName: 'Cypress API Test Report'
                        ])
                    } else {
                        echo "CI run detected – Mochawesome HTML not published"
                    }
                }
            }
        }
    }

    post {
        always {
            allure([
            results: [[path: 'allure-results']]
            ])
            cleanWs()
        }
   }

}
