var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var multipart = require('connect-multiparty');
var multiparty = require('multiparty');
var fs = require('fs');

var app = express();
var multipartMiddleware = multipart();// 为了接收 form-data类型的数据

app.use(bodyParser.json());//  为了解析 application/json
app.use(bodyParser.urlencoded({ extended: true}));// 为了解析 application/x-www-form-urlencoded
app.use(multer());// 为了解析 multipart/form-data
// 做一个纪录这里要使用multer中间件需要注意版本问题 否则无法正常启动app
// 应该装在下面这个版本： npm install multer@0.1.8

app.use('/static', express.static('../../public'));

var PORT = 3000;

app.listen(PORT, function(){
    console.log('server listenning on port:' + PORT);
});

app.post('/uploadfile', function(req, res, next){
    var form = new multiparty.Form({uploadDir: './images/'});
    form.parse(req, function(error, fileds, files){
        var filesTmp = JSON.stringify(files,null,2);
        if(error){
            console.log('error');
            console.log('parse error: ' + error);
        }else{
            console.log('parse files: ' + filesTmp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            var dstPath = './images/' + inputFile.originalFilename;
            // 重命名
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
        }
    });
    console.log('上传图片接口被请求!');
    // console.log(req.body, req.files);
    res.send('upload success!');
    // res.json(req.body);
});