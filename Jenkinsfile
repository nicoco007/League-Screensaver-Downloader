pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install -d'
        sh 'ng build --prod'
        archiveArtifacts 'dist/**'
        cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true)
      }
    }
    stage('Deploy') {
      steps {
        sh 'cp -r dist/* /var/www/gnyra.com/public_html/screensaver/'
      }
    }
  }
}