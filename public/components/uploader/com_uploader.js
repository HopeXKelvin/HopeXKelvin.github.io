// 基于vue的 上传图片组件

Vue.component('file-uploader', {
    template: '<div class="uploader-wrapper">'+
                '<uploader-item :upload-url="uploadUrl"></uploader-item>'+
                '</div>',
    data: function(){
        return {
            uploadUrl: 'http://localhost:3000/uploadfile'
        };
    }
});

Vue.component('uploader-item', {
    template: '<div>'+
                '<input name="image" type="file" class="image-loader" accept="image/*" v-on:change="uploadFile(testNum)"/><span>{{uploadUrl}}</span>'+
                '</div>',
    props: ['uploadUrl'],// 上传图片的地址、由父组件提供
    data: function(){
        return {
            statusInfo: '',
            testNum: 123,
            maxSize: 4096//单位KB、限制最大图片尺寸为4MB
        };
    },
    methods: {
        uploadFile: function(){
            var self = this;
            console.log(self.uploadUrl);
            var url = self.uploadUrl,
                maxSize = self.maxSize,
                statusInfo = self.statusInfo;
            // 上传文件方法
            var target = event.target,
                file = target.files[0],
                fileSize = file.size/1024,// 单位是 KB 方便后面计算
                fileName = file.name,
                fileType = file.type;
            
            // FormData对象,这个应该由父组件传进来，或者子组件触发事件将file值传出去，一次性上传.??
            var form = new FormData();
            form.append('image', file, fileName);

            // 利用xhr来异步传送文件数据
            var xhr = new XMLHttpRequest();
            // 初始化一个post请求
            xhr.open('POST', url, true);
            // 监听各种事件
            // 开始上传
            xhr.addEventListener('loadstart', function(e){
                statusInfo = '开始上传文件!';
                console.log(statusInfo);
            });
            // 上传进行中
            xhr.addEventListener('progress', function(e){
                var lengthComputable = e.lengthComputable,
                    loaded = e.loaded,
                    total = e.total;
                statusInfo = '正在上传中...' + loaded + '/' + total;
                console.log(statusInfo);
            });
            // 上传失败
            xhr.addEventListener('error', function(e){
                statusInfo = '上传失败!';
                console.log(statusInfo);                
            });
            // 上传成功
            xhr.addEventListener('load', function(e){
                var resText = JSON.parse(xhr.responseText);
                statusInfo = '上传完成!';
                console.log(resText);
                console.log(statusInfo);
            });

            // 发送数据
            xhr.send(form);
            
            console.log('uploadFile!');
        }
    }
});