pipeline {
  agent any

  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }

    stage('Run API Tests') {
      steps {
        sh '''
          npx cypress run \
          --env env=qa,QA_USERNAME=$QA_USERNAME,QA_PASSWORD=$QA_PASSWORD
        '''
      }
    }
  }
}
