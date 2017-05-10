(function(w){
    function setRem(devicePixelRatio,deviceWidth,baseWidth){
        var htmlDom = document.documentElement;
        // 计算当前屏幕下的font-size
        var fontSize = ((deviceWidth/baseWidth)*100) + "px";
        htmlDom.style.fontSize = fontSize;
    }

    function resizeEvent(){
        // 根据屏幕尺寸调整html下的font-size的值
        // 实现rem布局
        var dpr = window.devicePixelRatio;
        var windowRect = document.documentElement.getBoundingClientRect();
        var deviceWid = windowRect.width;
        var baseWid = 750;
        setRem(dpr,deviceWid,baseWid);
    }

    w.addEventListener("resize",function(event){
        resizeEvent();
    });

    resizeEvent();
})(window);