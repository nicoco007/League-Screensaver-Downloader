pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install -d'
        sh 'ng build --prod --base-href /screensaver/'
        archiveArtifacts 'dist/**'
      }
    }
    stage('Deploy') {
      steps {
        sh 'rm -r /var/www/nicoco007.com/public_html/screensaver/*'
        sh 'cp -r dist/* /var/www/nicoco007.com/public_html/screensaver/'
      }
    }
  }
}