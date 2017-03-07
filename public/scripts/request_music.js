$(function(){

  // 正常方式请求
  function requestNormal(){
    var url = "https://172.93.33.53:8090/get_music_list";
    function getContent(url){
      $.ajax({
        url : url,
        type : "GET",
        async : true,
        success : function(data){
          console.log(data);
          processData(data);
        },
        error : function(e){
          console.log(e);
        }
      });
    }
    // 处理数据
    function processData(data){
      console.log(data);
    }
    // 启动
    getContent(url);
  }

  // JSONP方式去请求
  function requestJSONP(){
    // 使用jsonp，进行跨域资源的调用
    var getJSONP = function(url,callbackName){
      var head = document.getElementsByTagName("head")[0],
      script = document.createElement("script");
      script.src = url + '?callback=' + callbackName;
      script.charset = "utf-8";
      script.onload = script.onreadystatechange = function(){
        if(!this.readyState || this.readyState == "loaded" || this.readyState == "complete"){
          setTimeout(function(){
            head.removeChild(script);
          },50);
        }
      };
      head.appendChild(script);
    };

    var holder = document.getElementById("resource_holder");
    var button = document.getElementById("get_resource");

    window.handleJSONP = function(data){
      // console.log(data);
      genMusicTable(data)
    };

    button.onclick = function(){
      holder.innerHTML = '';
      getJSONP("https://172.93.33.53:8090/get_music_list",'handleJSONP');
    };
  }

  window.requestNormal = requestNormal;
  window.requestJSONP = requestJSONP;
  requestJSONP();

  function genMusicTable(data){
    var musicListApp = new Vue({

    });
  }

});
