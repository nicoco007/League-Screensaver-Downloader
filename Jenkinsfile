pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install -d'
        sh 'ng build --prod'
        archiveArtifacts 'dist/**'
      }
    }
    stage('Deploy') {
      steps {
        sh 'cp -r dist/* /var/www/gnyra.com/public_html/screensaver/'
      }
    }
  }
}