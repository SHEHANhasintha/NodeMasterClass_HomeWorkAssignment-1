/*
* @PARAM
* @TODO :
* @Author : Shehan Hasintha
* @Date : 15/sep/2018 : 03:10
*/

//main object
const config = {};

//Enviroments
//localshot 3000
config.stagingEnv = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'developmentEnv'
}

//localhost 5000
config.ProductionEnv = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'productionEnv'
}

//currentEnv
const currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
//exportEnv
const exportEnv = typeof(config[currentEnv]) == 'object' ? config[currentEnv] : config.stagingEnv;
console.log('Enviroment Name :',exportEnv.envName)
//export
module.exports = exportEnv;
