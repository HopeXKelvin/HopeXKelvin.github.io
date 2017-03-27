window.onload = function(){
  // 定义一些全局的变量
  var posMap = {};// 存放9个点的x,y轴坐标范围信息,用于后面滑动屏幕解锁的时候做检测
  var pwdGestureOrder = [];// 存放收拾密码的序列
  var lineCanvas = null;

  function init(){
    // 初始化方法
    savePointInfo();
    renderCanvas();
    bindEvent();
  }

  function savePointInfo(){
    // 存放9个点的x,y轴坐标范围的信息的方法
    var points = document.getElementsByClassName("lock-item");
    for(var i=0;i<points.length;i++){
      posMap[i+1] = {};
      // x轴的范围
      var xLeft = points[i].offsetLeft;
      var xRight = points[i].offsetLeft + points[i].clientWidth;
      // y轴的范围
      var yTop = points[i].offsetTop;
      var yBottom = points[i].offsetTop + points[i].clientHeight;
      // 圆点的中心坐标
      var xCenter = xLeft + (xRight-xLeft)/2;
      var yCenter = yTop + (yBottom-yTop)/2;
      posMap[i+1].x = [xLeft,xRight];
      posMap[i+1].y = [yTop,yBottom];
      posMap[i+1].pos = [xCenter,yCenter];
      posMap[i+1].hasTap = false;
      posMap[i+1].id = "dot_" + (i+1);
    }
    console.log(posMap);
  }

  function renderCanvas(){
    // 渲染画布，画布的作用是画线，生成手势之间的连线
    var canvas = document.createElement("canvas");
    canvas.className = "line-canvas";
    document.body.appendChild(canvas)
    lineCanvas = canvas.getContext("2d");
    // lineCanvas.moveTo(157,100)
    // lineCanvas.lineTo(399,256)
    // lineCanvas.stroke()
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
      console.log(event);
    });
    lockBox.addEventListener("touchend",function(event){
      console.log("touch end");
      // 隔个300毫秒，去掉红点效果
      var selectedPoints = document.getElementsByClassName("selected");
      setTimeout(function(){
        while(selectedPoints.length > 0){
          var index = selectedPoints[0].getAttribute("data-index");//这个一定要放在前面，因为 selectedPoints这个值是动态变化的
          selectedPoints[0].className = selectedPoints[0].className.replace("selected","");
          // 还要修改以下posMap的数据结构
          posMap[index].hasTap = false;
        }
      },300);
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
          if(pwdGestureOrder.length <= 0){
            // 表示数组为空
          }else{
            // 前面已经有序列了
            var prevIndex = pwdGestureOrder[pwdGestureOrder.length-1];
            var prevPos = posMap[prevIndex].pos;
            var nextPos = posMap[index].pos;
            lineCanvas.moveTo(prevPos[0]/2,prevPos[1]/10);
            lineCanvas.lineTo(nextPos[0]/2,nextPos[1]/10);
            lineCanvas.stroke();
          }
          pwdGestureOrder.push(index);// 把这个点 push 到数组里面
          posMap[index].hasTap = true;
          // 给该原点添加一个类，转变样式
          var tapDom = document.getElementById(posMap[index].id);
          tapDom.className = tapDom.className + " selected";
        }
      }
    }
  }

  // 画线的方法
  function drawLine(from,to){

  }
  // 调用方法
  init();
};
