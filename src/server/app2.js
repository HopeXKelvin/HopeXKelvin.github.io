var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var multipart = require('connect-multiparty');
var multiparty = require('multiparty');
var fs = require('fs');
var path = require('path');

var app = express();
var multipartMiddleware = multipart();// 为了接收 form-data类型的数据

app.use(bodyParser.json());//  为了解析 application/json
app.use(bodyParser.urlencoded({ extended: true}));// 为了解析 application/x-www-form-urlencoded
// app.use(multer());// 为了解析 multipart/form-data
// 做一个纪录这里要使用multer中间件需要注意版本问题 否则无法正常启动app
// 应该装在下面这个版本： npm install multer@0.1.8

app.use('/static', express.static('../../public/'));

var PORT = 3000;

app.listen(PORT, function(){
    console.log('server listenning on port:' + PORT);
});

// diskStorage 可以实现自定义存储文件的目录，且可以对上传的文件进行重命名.
// The disk storage engine gives you full control on storing files to disk.
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/components/uploader/images/'));// 设置文件存放的路径
    },
    filename: function(req, file, cb){
        // 重命名文件，以防止名字相同的文件被覆盖
        cb(null, Date.now() + '_' + file.originalname);
    }
});

// var upload = multer({ dest: 'uploads/' })
var upload = multer({storage: storage});

app.post('/uploadfile', upload.single('image'), function(req, res, next){
    console.log(req.file);
    console.log(req.body);
    var fileInfo = req.file,
        path = fileInfo.path;
    res.send({
        status: 1,
        info: '上传成功!',
        data: {
            path: path
        }
    });
});