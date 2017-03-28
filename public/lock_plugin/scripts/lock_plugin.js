window.onload = function(){
  // 定义一些全局的变量
  var posMap = {};// 存放9个点的x,y轴坐标范围信息,用于后面滑动屏幕解锁的时候做检测
  var pwdGestureOrder = [];// 存放收拾密码的序列
  var lineCanvas = null;
  var mode = 1;// 表示当前处于什么模式下,1表示正在设置密码手势，0表示进入验证的状态,刚开始的默认值是1 表示设置密码
  var localStorage = window.localStorage;
  // 每一次进入页面都要重新清空一下 localStorage
  localStorage.clear();
  var setPwdList = [];

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
    document.body.appendChild(canvas);
    lineCanvas = canvas.getContext("2d");
    // 设置 canvas 的宽高
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    canvas.setAttribute("width",screenWidth);
    canvas.setAttribute("height",screenHeight);
    lineCanvas.strokeStyle = "rgba(100,100,100,1)";
    lineCanvas.lineWidth = 6;
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
      // 隔个300毫秒，去掉红点效果
      var selectedPoints = document.getElementsByClassName("selected");
      setTimeout(function(){
        while(selectedPoints.length > 0){
          var index = selectedPoints[0].getAttribute("data-index");//这个一定要放在前面，因为 selectedPoints这个值是动态变化的
          selectedPoints[0].className = selectedPoints[0].className.replace("selected","");
          // 还要修改以下posMap的数据结构
          posMap[index].hasTap = false;
        }
        // 清空路径，为下一次重新绘制做准备
        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;
        lineCanvas.clearRect(0,0,screenWidth,screenHeight);
        lineCanvas.beginPath();

        // 检测当前密码序列是否小于4个点
        if(pwdGestureOrder.length<5){
          // 不符合要求，给出提示
          // 根据 mode 的不同，显示不同的提示
          var msg = {};
          if(mode === 0){
            // 验证模式
            msg.tipsContent = "密码验证失败";
          }else{
            msg.tipsContent = "密码手势设置不能少于5个点";
          }
          popTips(msg);
        }else{
          // 符号手势点数的要求，根据mode 的状态是设置密码还是验证密码
          switch (mode) {
            case 0:
              // 验证模式下，做密码的比较
              var realPwdStr = localStorage.getItem("password");
              // var realPwdStr = realPwd.join("");
              var inputPwdStr = pwdGestureOrder.join("");
              if(realPwdStr === inputPwdStr){
                // 密码验证成功
                popTips({tipsContent:"密码验证成功!"});
              }else{
                // 密码验证失败
                popTips({tipsContent:"密码验证失败"});
              }
              break;
            case 1:
              // 设置模式
              if(setPwdList.length<=0){
                // 当前第一次设置
                setPwdList.push(pwdGestureOrder);
                // 第一次设置成功
                popTips({tipsContent:"第一次设置成功"});
              }else{
                // 第二次设置,比较前后两次是否一致
                var secondPwdStr = pwdGestureOrder.join("");
                var firstPwdStr = setPwdList.pop().join("");
                if(firstPwdStr === secondPwdStr){
                  // 两次设置一致
                  // 更新localStorage
                  localStorage.setItem("password",secondPwdStr);
                  setPwdList = [];//同样要清空
                  popTips({tipsContent:"密码设置成功"});
                }else{
                  // 两次设置密码不一致，重置设置密码
                  setPwdList = [];// 清空
                  popTips({tipsContent:"两次密码设置不一致，请重新设置"});
                }
              }
              break;
            default:
              break;
          }
        }
        // 还需要清空 pwdGestureOrder 序列的数
        pwdGestureOrder = [];
      },300);
      console.log(event);
    });

    // 设置按钮事件
    var btnGroup = document.getElementsByClassName("switch-btn-group")[0];
    btnGroup.addEventListener("click",function(event){
      var target = event.target;
      var targetId = event.target.id;
      var activeBtn = document.getElementsByClassName("btn active")[0];
      switch (targetId) {
        case "setPwdBtn":
          // 设置密码模式
          if(target !== activeBtn){
            activeBtn.className = activeBtn.className.replace("active","");
            target.className = target.className + " active";
          }
          mode = 1;
          break;
        case "verifyPwdBtn":
          // 检测当前是否已经设置好了密码手势
          if(localStorage.length>0){
            if(target !== activeBtn){
              activeBtn.className = activeBtn.className.replace("active","");
              target.className = target.className + " active";
            }
            mode = 0;
          }else{
            // 提示要先设置密码手势
            var msg = {tipsContent: "必须先设置密码才能进行验证"};
            popTips(msg);
          }
          break;
        default:
          break;
      }
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
          console.log("第 " + index + "点被碰到了");
          if(pwdGestureOrder.length <= 0){
            // 表示数组为空
          }else{
            // 前面已经有序列了
            var prevIndex = pwdGestureOrder[pwdGestureOrder.length-1];
            var prevPos = posMap[prevIndex].pos;
            var nextPos = posMap[index].pos;
            lineCanvas.moveTo(prevPos[0],prevPos[1]);
            lineCanvas.lineTo(nextPos[0],nextPos[1]);
            lineCanvas.stroke();
          }
          pwdGestureOrder.push(index);// 把这个点 push 到数组里面
          posMap[index].hasTap = true;
          // 给该原点添加一个类，转变样式
          var tapDom = document.getElementById(posMap[index].id);
          tapDom.className = tapDom.className + " selected";
          // 打印一下序列信息
          console.log(pwdGestureOrder);
        }
      }
    }
  }

  // 弹出提示的方法
  function popTips(msg){
    var tipsBox = document.getElementById("tipsBox");
    var tipsTitle = document.getElementById("tipsTitle");
    var tipsContent = document.getElementById("tipsContent");
    var tips = document.getElementsByClassName("tips")[0];

    tipsTitle.innerHTML = msg.tipsTitle || "tips";
    tipsContent.innerHTML = msg.tipsContent;
    tips.innerHTML = msg.tipsContent;
    // tipsBox.style.display = "block";
    setTimeout(function(){
      // tipsBox.style.display = "none";
      tips.innerHTML = "";// 清空提示
    },1000);
  }
  // 调用方法
  init();
};
