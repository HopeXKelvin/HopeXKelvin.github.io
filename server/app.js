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
  "cloud_music_list" : "https://music.163.com/api/playlist/detail?id=1612159",
  "cloud_music_lyric" : ""
};
var outerRequest = {
  "request_music" : "/get_music_list",
  "request_lyric" : "/get_music_lyric"
};

// 请求网易云的歌单API,获取数据
app.get(outerRequest.request_music,function(req,res){
  if(req.protocol === 'https'){
    // res.status(200).send("Welcome to Safety Land!");
    console.log("请求网易云音乐列表!");
    console.log(req.query);
    var _callback = req.query.callback;
    if(_callback){
      console.log("参数中有回掉函数!");
      var apiURL = requestUrl.cloud_music_list;
      // 发送 http请求，获取真正需要的内容
      request(apiURL, function(error,response,body){
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var infos = body;
        // console.log(infos);
        res.type("text/javascript");
        res.send(_callback + '('+ JSON.stringify(infos) +')');
      });
    }else{
      res.send("没有JSONP回掉函数!");
    }
    // res.send(requestMusicList(requestUrl.cloud_music_list));
  }else{
    res.status(200).send("Welcome");
  }
});
// 请求网易云的歌曲API，这里主要是获取歌词
