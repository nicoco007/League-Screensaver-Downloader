pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
        sh 'ng build --prod --base-href /screensaver/'
        archiveArtifacts 'dist/**'
      }
    }
    stage('Deploy') {
      steps {
        sh 'rm -rf /var/www/nicoco007.com/public_html/screensaver/'
        sh 'mkdir /var/www/nicoco007.com/public_html/screensaver/'
        sh 'cp -r dist/. /var/www/nicoco007.com/public_html/screensaver/'
        sh 'cp -r static/. /var/www/nicoco007.com/public_html/screensaver/'
      }
    }
  }
}
