(function($){
  // 定义私有方法
  var privateFun = function(){

  };

  // 插件实现类
  var PageSwitch = (function(){// 立即执行函数
    function PageSwitch(element,options){
      // 属性
      this.settings = $.extend(true,$.fn.PageSwitch.default,options);
      this.element = element;
      // 调用初始化方法
      this.init();
    }

    // 方法
    PageSwitch.prototype = {
      init : function(){
        // 初始化方法
        console.log("插件初始化!");
        this.renderDom();
        this.bindEvent();
      },
      renderDom : function(){
        // 做一些初始化的时候需要做的dom结构渲染
        // 以及操作
        var fullpageDomList = this.element.children();
        fullpageDomList[0].setAttribute("data-active",true);
        fullpageDomList[0].className = fullpageDomList[0].className + " active";
        // 存一些参数的和dom结构

        // 建立ul导航点
        this.renderNavList(4);
      },
      renderNavList : function(listNum){
        var navListDom = document.createElement("ul");
        $(navListDom).addClass("nav-list");
        for(var i=0;i<listNum;i++){
          var item = document.createElement("li");
          $(item).addClass("nav-list-item");
          $(item).attr("data-index",i);
          navListDom.appendChild(item);
        }
        // 给第一个li加上active 状态
        $(navListDom.children[0]).addClass("active");
        $(navListDom.children[0]).attr("data-active",true);
        // 拼接到 this.element 上去
        this.element.append(navListDom);
      },
      bindEvent : function(){
        var _this = this;
        console.log("绑定事件!");
        // 绑定事件的方法
        // 绑定鼠标滚动事件
        var $body = $(document.body);
        $body.on('mousewheel',function(event){
          event.preventDefault();
          // 窗口滚动事件
          var mousewheelEvent = event.originalEvent;
          var delta = mousewheelEvent.wheelDelta;
          if(delta>0){
            console.log("向上滚动");
            _this.scrollPage("prev");
          }else{
            console.log("向下滚动");
            _this.scrollPage("next");
          }
        });

        // 绑定每一个navlist 下面的 item 的事件
        $(".nav-list").delegate("li","click",function(event){
          console.log(event);
          var target = event.currentTarget;
          var dataIndex = target.getAttribute("data-index");
          var oldActiveEle = $('div[data-active="true"]');
          var oldActiveLi = $('li[data-active="true"]');

          var $pageList = _this.element.find("div.full-page");
          var newActivePage = $pageList[parseInt(dataIndex)];

          // 获取需要激活的 page的 offsetTop 的值
          var offsetTop = newActivePage.offsetTop;
          setTimeout(function(){
            _this.scrollFullPage(-offsetTop,200);
            // 更改 全屏部分的显示 状态
            oldActiveEle.attr("data-active",false);
            oldActiveEle.removeClass("active");
            $(newActivePage).attr("data-active",true);
            $(newActivePage).addClass("active");
            // 更改 navlist 的显示状态
            oldActiveLi.attr("data-active",false);
            oldActiveLi.removeClass("active");
            $(target).attr("data-active",true);
            $(target).addClass("active");
          },150);
        });
      },
      onTop : function(){
        // 返回一个布尔值，代表目前是否已经滚动到最顶部
        var first = this.element.children()[0];
        if(first.getAttribute("data-active")){
          return true;
        }
        return false;
      },
      onLast : function(){
        // 返回一个布尔值，表示目前是否已经滚动到最底部
        var $last = this.element.children()[this.element.children().length - 1];
        if($last.getAttribute("data-active")){
          return true;
        }
        return false;
      },
      scrollPage : function(toward){
        var _this = this;
        if(toward === "next"){
          // 向下一个滚动
          var oldActiveEle = $('div[data-active="true"]');
          var oldActiveLi = $('li[data-active="true"]');
          var nextEle = oldActiveEle.next();
          var nextLi = oldActiveLi.next();
          if(nextEle.length > 0 && nextLi.length >0){
            var topOffset = nextEle[0].offsetTop;
            setTimeout(function(){
              _this.scrollFullPage(-topOffset,200);
              // 更改 全屏部分的显示 状态
              oldActiveEle.attr("data-active",false);
              oldActiveEle.removeClass("active");
              nextEle.attr("data-active",true);
              nextEle.addClass("active");
              // 更改 navlist 的显示状态
              oldActiveLi.attr("data-active",false);
              oldActiveLi.removeClass("active");
              nextLi.attr("data-active",true);
              nextLi.addClass("active");
            },150);
          }
        }else{
          // 向上一个滚动
          var oldActiveEle = $('div[data-active="true"]');
          var oldActiveLi = $('li[data-active="true"]');
          var prevEle = oldActiveEle.prev();
          var prevLi = oldActiveLi.prev();
          if(prevEle.length > 0 && prevLi.length >0){
            var topOffset = prevEle[0].offsetTop;
            setTimeout(function(){
              _this.scrollFullPage(-topOffset,200);
              // 更改 全屏部分的显示 状态
              oldActiveEle.attr("data-active",false);
              oldActiveEle.removeClass("active");
              prevEle.attr("data-active",true);
              prevEle.addClass("active");
              // 更改 navlist 的显示状态
              oldActiveLi.attr("data-active",false);
              oldActiveLi.removeClass("active");
              prevLi.attr("data-active",true);
              prevLi.addClass("active");
            },150);
          }
        }
      },
      scrollFullPage : function(yPos,speed){
        // var $body = $("html,body");
        var $this = $(this.element);
        // var speed = 200;
        // 检测不同的浏览器
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        $this.animate({
          top : yPos
        },speed,function(){
          console.log("动画完成!");
        });
      }
    };
    // 返回对象
    return PageSwitch;
  })();

  // 扩展$方法,封装插件
  $.fn.PageSwitch = function(options){
    // 保持链式调用
    return this.each(function(){
      // 调用当前方法的dom结构
      var me = $(this);
      var instance = me.data("PageSwitch");
      if(!instance){
        // 如果实例不存在,实例化一个插件对象
        instance = new PageSwitch(me,options);
        me.data("PageSwitch",instance);
      }
      if($.type(options) === "string"){
        return instance[options]();
      }
    });
  };
  // 默认参数
  $.fn.PageSwitch.default = {

  };
})(jQuery)
