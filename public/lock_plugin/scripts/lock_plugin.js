window.onload = function(){
  // 定义一些全局的变量
  var posMap = {};// 存放9个点的x,y轴坐标范围信息,用于后面滑动屏幕解锁的时候做检测
  var pwdGestureOrder = null;// 存放收拾密码的序列

  function init(){
    // 初始化方法
    savePointInfo();
    bindEvent();
  }

  function savePointInfo(){
    // 存放9个点的x,y轴坐标范围的信息的方法
    var points = document.getElementsByClassName("lock-item");
    for(var i=0;i<points.length;i++){
      posMap[i+1] = {};
      var xLeft = points[i].offsetLeft;
      var xRight = points[i].offsetLeft + points[i].clientWidth;
      var yTop = points[i].offsetTop;
      var yBottom = points[i].offsetTop + points[i].clientHeight;
      posMap[i+1].x = [xLeft,xRight];
      posMap[i+1].y = [yTop,yBottom];
      posMap[i+1].hasTap = false;
      posMap[i+1].id = "dot_" + (i+1);
    }
    console.log(posMap);
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
      // console.log("touch move");
      var clientX = parseInt(event.changedTouches[0].clientX);
      var clientY = parseInt(event.changedTouches[0].clientY);
      // helpDom.innerHTML += "<br>ClientX : " + clientX + ",ClientY : " + clientY;
      tapPoint(clientX,clientY);
      // console.log(event);
    });
    lockBox.addEventListener("touchend",function(event){
      console.log("touch end");
      console.log(event);
    });
  }

  // 触发碰到点的效果
  function tapPoint(xpos,ypos){
    // 便利 posMap
    for(var index in posMap){
      if(posMap[index].hasTap === false){
        var xL = posMap[index].x[0];
        var xR = posMap[index].x[1];
        var yT = posMap[index].y[0];
        var yB = posMap[index].y[1];
        if((xpos>xL && xpos<xR) && (ypos>yT && ypos<yB)){
          // 检测该点在触碰的范围内
          console.log("第 " + index + "个点被碰到了");
          posMap[index].hasTap = true;
          // 给该原点添加一个类，转变样式
          var tapDom = document.getElementById(posMap[index].id);
          tapDom.className = tapDom.className + " selected";
        }
      }
    }
  }
  // 调用方法
  init();
};
