window.onload = function(){
  init();

  function init(){
    // 初始化方法
    bindEvent();
  }

  function bindEvent(){
    // 定义一些变量
    var helpDom = document.getElementsByClassName("help-display")[0];
    // 绑定事件方法
    var lockBox = document.getElementById("lockBox");
    lockBox.addEventListener("touchstart",function(event){
      console.log("touch start !");
      console.log(event);
    });
    lockBox.addEventListener("touchmove",function(event){
      event.preventDefault();// 阻止页面滚动
      console.log("touch move");
      helpDom.innerHTML += "<br>ClientX : " + event.changedTouches[0].clientX + ",ClientY : " + event.changedTouches[0].clientY;
      console.log(event);
    });
    lockBox.addEventListener("touchend",function(event){
      console.log("touch end");
      console.log(event);
    });
  }
};
