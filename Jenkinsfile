def buildClosure = {
  def nodeHome = tool name: 'nodejs-dubnium', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
  env.PATH = "${nodeHome}/bin:${env.PATH}"

  stage('Install')
  sh 'yarn'
  sh 'git submodule init && git submodule update'
  sh 'cd diva-react && yarn && yarn run build && yarn link && cd ..'
  sh 'yarn link diva-react'

  stage('Lint')
  sh 'yarn run lint'

  stage('Test')
  sh 'echo TODO!'

  stage('Build')
  sh 'yarn run build-docker'
}

def buildParameterMap = [:]
buildParameterMap['appName'] = 'diva-js-reference-3p-frontend'
buildParameterMap['buildClosure'] = buildClosure
buildParameterMap['deploymentStrategy'] = [
    "*": ["promote:nebm-int"],
    "develop":["nebm-int", "promote:nebm-acc"],
    "master": ["nebm-int", "nebm-acc", "promote:nebm-prd"]
]

buildAndDeployGeneric(buildParameterMap)

// vim: ft=groovy
