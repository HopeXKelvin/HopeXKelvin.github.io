var express = require("express");
var request = require("request");
var fs = require("fs");
var http = require("http");
var https = require("https");
var privateKey = fs.readFileSync("/var/local/ssl/private.pem","utf8");
var certificate = fs.readFileSync("/var/local/ssl/file.crt","utf8");
var credentials = {key : privateKey,cert : certificate};

var app = express();
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials,app);
var PORT = 8080;
var SSLPORT = 8090;

httpServer.listen(PORT,function(){
  console.log("HTTP Server is running on : http://localhost:%s",PORT);
});

httpsServer.listen(SSLPORT,function(){
  console.log("HTTPS Server is running on : https://localhost:%s",SSLPORT);
});

var requestUrl = {
  "cloud_music_api" : "https://music.163.com/api/playlist/detail?id=1612159"
};
var outerRequest = {
  "request_music" : "/get_music_list"
};

// app.listen(port,function(){
//   console.log("listening on port " + port);
// });
//
// // 请求网易云的api,获取数据
app.get(outerRequest.request_music,function(req,res){
  if(req.protocol === 'https'){
    // res.status(200).send("Welcome to Safety Land!");
    console.log("请求网易云音乐列表!");
    // console.log(requestMusicList(requestUrl.cloud_music_api));
    res.send(requestMusicList(requestUrl.cloud_music_api));
  }else{
    res.status(200).send("Welcome");
  }
})

// 接收https请求
// https.get(outerRequest.request_music,function(res){
//   console.log('statusCode:',res.statusCode);
//   console.log('headers:',res.headers);
//
// });

// 用http来接收请求，并使用 request和它的 pipe()方法
// http.createServer(function(req,resp){
//   if(req.url === "get_music_list"){
//     var x = request(requestUrl.cloud_music_api);
//     req.pipe(x);
//     x.pipe(resp);
//   }
// });


function requestMusicList(url){
  // 发送 http请求，获取需要的内容
  request(url, function(error,response,body){
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    return body;
  });
}
