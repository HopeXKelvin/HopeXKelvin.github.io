(function($){
  // 定义私有方法
  var privateFun = function(){

  };

  // 插件实现类
  var PageSwitch = (function(){// 立即执行函数
    function PageSwitch(element,options){
      // 属性
      this.settings = $.extend(true,$.fn.PageSwitch.default,options);
      this.options = options;
      // 调用初始化方法
      this.init();
    }

    // 方法
    PageSwitch.prototype = {
      init : function(){
        // 初始化方法
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
        instance = new pageSwitch(me,options);
        me.data("PageSwitch",instance);
      }
      if($.type(options) === "string"){
        return instance[options]();
      }
      // 示例，调用方法
      $("#div-1").PageSwitch("init");// 这样是调用了init方法
    });
  };
  // 默认参数
  $.fn.PageSwitch.default = {

  };
})(jQuery)
