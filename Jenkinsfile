pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'ng build --prod'
        archiveArtifacts 'dist'
      }
    }
  }
}