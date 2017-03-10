$(function(){
  // JSONP方式去请求
  function requestJSONP(){
    // 使用jsonp，进行跨域资源的调用
    var getJSONP = function(url,callbackName){
      var head = document.getElementsByTagName("head")[0],
      script = document.createElement("script");
      script.src = url + '&callback=' + callbackName;
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
      var jsonData = JSON.parse(data);
      var realData = processData(jsonData);
      genMusicTable(realData)
    };

    button.onclick = function(){
      holder.innerHTML = '';
      var listId = document.getElementById("musicId").value;
      getJSONP("https://172.93.33.53:8090/get_music_list?listid="+listId,'handleJSONP');
    };
  }
  // 用需要的有用信息去填充dom结构，第一步先展示简单的歌曲信息
  function genMusicTable(data){
    var musicListApp = new Vue({
      el : "#songInfoTable",
      data : {
        listName : data.title,
        songList : data.songList
      },
      methods : {}
    });
  }
  // 处理原始数据，使其变成需要的数据格式返回
  function processData(originDatas){
    var songList = originDatas.result.tracks;
    var titleName = originDatas.result.name;
    var targetDatas = [];
    for(var i=0;i<songList.length;i++){
      var songInfo = {};
      songInfo.id = songList[i].id;
      songInfo.songName = songList[i].name;
      songInfo.songArtist = getArtistToStr(songList[i].artists);
      songInfo.songUrl = songList[i].mp3Url;
      targetDatas.push(songInfo);
    }
    return {
      "title" : titleName,
      "songList" targetDatas
    };
  }

  // 由于一首歌的artist数据对应是一个数组，可能有多个人一起演唱的歌，所以需要把数组的值取出来，拼接一下
  function getArtistToStr(artistList){
    var artistStr = "";
    for(var i=0;i<artistList.length;i++){
      artistStr += (" " + artistList[i].name);
    }
    return artistStr;
  }

  requestJSONP();
});
