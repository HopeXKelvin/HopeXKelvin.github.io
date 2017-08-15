// 基于vue的 上传图片组件

Vue.component('file-uploader', {
    template: '<div class="uploader-wrapper">'+
                '<uploader-item></uploader-item>'+
                '</div>',
    data: function(){
        return {};
    }
});

Vue.component('uploader-item', {
    template: '<input type="file" class="image-loader" accept="image/*" v-on:change="uploadFile(testNum)"></input>',
    data: function(){
        return {
            testNum: 123,
            maxSize: 4096//单位KB、限制最大图片尺寸为4MB
        };
    },
    methods: {
        uploadFile: function(){
            // 上传文件方法
            var target = event.target,
                file = target.files[0],
                fileSize = file.size/1024,// 单位是 KB 方便后面计算
                fileName = file.name,
                fileType = file.type;
            
            // FormData对象,这个应该由父组件传进来，或者子组件触发事件将file值传出去，一次性上传.??
            var form = new FormData();
            form.append();
            // 进行各种判断
            
            console.log('uploadFile!');
        }
    }
});