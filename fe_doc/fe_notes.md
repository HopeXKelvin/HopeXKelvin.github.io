# FE-学习笔记  

## 目录：
> [关于继承](#inheritance)

### <span id="inheritance">关于继承 </span>

> 原型链：对象实例会集成其原型对象上的属性，原型对象也是一个对象，它也会集成它自己的原型对象拥有的属性，依此类推，这就是原型链。  

> 所有的对象，包括那些自己定义的对象都自动继承自Object，除非另有指定(这里的另有指定是什么意思?).更确切的说，所有对象都继承自 Object.prototype  

```javascript  
  var book = {title : "Learning Javascript"};
  var prototype = Object.getPrototypeOf(book);
  console.log(prototype === Object.prototype);// true
```  

### 关于 call,apply,bind方法  

> 每个函数都包含两个非继承而来的方法：call()和apply()。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。  

> apply方法的接收两个参数，一个是在其中运行函数的作用域，另一个是参数数组。第二个参数可以是Array的实例，也可以是arguments对象。  

> call方法与apply方法的作用相同。区别仅仅在于接收参数的方式不同。call的第二个参数必须是逐个列举出来的。  

> ES5中还定义了一个 bind方法，这个方法会创建一个函数的实例，其this值会被绑定到传给bind()函数的值。

```javascript
  function sum(num1,num2){
    return num1+num2;
  }

  // apply() 调用 第二个参数可以是arguments 或者 参数数组
  function callSum1(num1,num2){
    sum.apply(this,[num1,num2]);
  }

  function callSum2(num1,num2){
    sum.apply(this,arguments);
  }

  // call() 调用 除了第一个参数外，其余的参数需要一一列举出来
  function callSum3(num1,num2){
    sum.call(this,num1,num2);
  }

  // bind()的使用实例
  window.color = "red";
  var obj = {
    color : "blue"
  };

  function sayColor(){
    console.log(this.color);
  }

  var fnSayColor = sayColor.bind(obj);
  fnSayColor();// blue
```  

### 关于 echarts的简单入门使用代码：  

简单使用echarts:  

```html
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>ECharts</title>
      <!-- 引入 echarts.js -->
      <script src="echarts.min.js"></script>
  </head>
  <body>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 600px;height:400px;"></div>
      <script type="text/javascript">
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('main'));

          // 指定图表的配置项和数据
          var option = {
              title: {
                  text: 'ECharts 入门示例'
              },
              tooltip: {},
              legend: {
                  data:['销量']
              },
              xAxis: {
                  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
              },
              yAxis: {},
              series: [{
                  name: '销量',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10, 20]
              }]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
      </script>
  </body>
  </html>
```  

就会有下面的显示:  

![img](http://p1.bqimg.com/567571/338ce06a302e95f6.png)  

### 关于物理像素,设备独立像素等内容的概念  
> 物理像素  

> 设备独立像素  

> 设备像素比(device pixel ratio)  
> 设备像素比=物理像素/设备独立像素  
> JS中可以通过 window.devicePixelRatio 获取到当前设备的dpr  
> css中可以通过 -webkit-device-pixel-ratio,-webkit-min-device-pixel-ratio,-webkit-max-device-pixel-ratio 进行媒体查询，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)  

[像素点](http://www.html-js.com/article/Mobile-terminal-H5-mobile-terminal-HD-multi-screen-adaptation-scheme%203041)  

### box-sizing属性  

### JS运算符的优先级  
> 结合性:  
a OP b OP c  
左联合(从左到右计算) : (a OP b) OP c  
右联合(从右到左计算) : a OP (b OP c)  
JS中赋值运算符是右关联的，所以可以这么写：  
```javascript
  a = b = 5;//结果是 a,b的值都会成为5
```  

优先级的汇总表如下：

![](http://p1.bqimg.com/567571/1744004bd4096de5.png)  

![](http://p1.bqimg.com/567571/a9879812e0ade85e.png)  

![](http://p1.bpimg.com/567571/d86c2b0a3d7f9811.png)  


### 一道有趣的JS代码题：  
```javascript
  function Foo(){
    getName = function(){ console.log(1); };
    return this;
  }
  Foo.getName = function(){ console.log(2); };
  Foo.prototype.getName = function(){ console.log(3); };
  var getName = function(){ console.log(4); };
  function getName(){
    console.log(5);
  }

  // 写出下面的输出结果
  Foo.getName();
  getName();
  Foo().getName();
  getName();
  new Foo.getName();
  new Foo().getName();
  new new Foo().getName();
```
