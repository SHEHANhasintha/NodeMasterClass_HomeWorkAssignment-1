/*
* @PARAM
* @TODO:
* @Author : Shehan Hasintha
* @Date : 15/sep/2018 : 01:10
*/

const http = require('http');
const https = require('https');
const url = require("url");
const config = require('./config');
const stringdecoder = require('string_decoder').StringDecoder;
const fs = require('fs');

//main object
const main = {};

//run http server:3000
const httpServer = http.createServer(function(req,res){
  //serverFunctionality
  serverFunctionality(req,res);
})

httpServer.listen(config.httpPort,function(){
    console.log('server listening: ',config.httpPort);
})

//run https server:5000
const httpsServer = https.createServer(function(req,res){
  //serverFunctionality
  serverFunctionality(req,res);
})

httpsServer.listen(config.httpsPort,function(){
    console.log('server listening: ',config.httpsPort);
})

//serverFunctionality
const serverFunctionality = function(req,res){
  //url
  let urlParsed = url.parse(req.url,true);
  //path
  let path = urlParsed.pathname;
  //trimmedPath
  let trimedPath = path.replace(/^\/+|\/+$/g,'');
  //method
  let method = req.method.toLowerCase();
  //headers
  let headers = req.headers;
  //queryString
  let queryString = urlParsed.query;

  //get the stringming data
  let decoder = new stringdecoder('utf-8');
  //buffer
  let buffer = '';

  req.on('data',function(data){
    buffer += decoder.write(data);
  });

  req.on('end',function(){
    //buffer dataEnd
    buffer += decoder.end();
    //404 notFound
    let directPage = (typeof(router[trimedPath]) === 'undefined') ? handlers.notFound : router[trimedPath];
    //data
    let data = {
      'trimedPath' : trimedPath,
      'method' : method,
      'headers' : headers,
      'queryString' : queryString,
      'payload' : buffer
    };
    //pages
    directPage(data,function(statusCode,payload){
      //data validate
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      payload = typeof(payload) === 'object' ? payload : {};
      //parse json
      let payloadStringify = JSON.stringify(payload);
      res.setHeader = ('Content-type','application/json')
      //res Writehead
      res.writeHead(statusCode);
      res.end(payloadStringify);
      //payload
      console.log('JSON: ', payloadStringify,
      '\nstatuscode: ',statusCode,
      '\npayload: ', data.payload
    );
    });
    //console-log
    //sever end
  })

};

//handlers
const handlers = {};
//default page
handlers.notFound = function(data,callback){
  callback(404);
}

//helloWorld page
handlers.helloWorld = function(data,callback){
  callback(406,{'message':'helloWorld'});
}

//users
handlers.accessablePage = function(data,callback){
  callback(200,{'accessDetails':'AccessGranted'});
}

//router
const router = {
  'helloworld':handlers.helloWorld,
  'accessablePage':handlers.accessablePage
};

//ssl authority
const sslAuth = {

}
