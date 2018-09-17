def buildClosure = {
  def nodeHome = tool name: 'nodejs-8.6.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
  env.PATH = "${nodeHome}/bin:${env.PATH}"

  stage('Install')
  sh 'yarn'

  stage('Lint')
  sh 'yarn run lint'

  stage('Test')
  sh 'echo TODO!'

  stage('Build')
  sh 'yarn run build-docker'
}

def buildParameterMap = [:]
buildParameterMap['appName'] = 'diva-fieldlab-frontend'
buildParameterMap['buildClosure'] = buildClosure
buildParameterMap['deploymentStrategy'] = [
    "*": ["promote:nebm-dev"],
]

buildAndDeployGeneric(buildParameterMap)

// vim: ft=groovy
