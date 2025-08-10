pipeline {
  agent any
  environment {
    IMAGE = 'donation-frontend'
    CONTAINER = 'donation-frontend'
    NETWORK = 'donation-net'
    GIT_URL = 'https://github.com/Antonshepitko/front'
    // GIT_CRED = 'github-creds' // раскомментируй, если репо приватный
  }
  stages {
    stage('Clone') {
      steps {
        git url: env.GIT_URL
        // git credentialsId: env.GIT_CRED, url: env.GIT_URL
      }
    }
    stage('Build image') {
      steps {
        sh 'docker build --no-cache -t ${IMAGE} .'
      }
    }
    stage('Stop & Remove old') {
      steps {
        sh 'docker rm -f ${CONTAINER} || true'
      }
    }
    stage('Run') {
      steps {
        sh '''
          docker network inspect ${NETWORK} >/dev/null 2>&1 || docker network create ${NETWORK}
          docker run -d --name ${CONTAINER} --network ${NETWORK} -p 80:80 ${IMAGE}
        '''
      }
    }
  }
}
