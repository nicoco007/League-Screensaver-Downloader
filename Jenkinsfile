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
  }
}