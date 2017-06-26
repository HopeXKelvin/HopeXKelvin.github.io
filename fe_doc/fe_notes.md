# FE-学习笔记  

## 目录：
> [关于继承](#inheritance)  
> [关于 call,apply,bind方法](#call_apply_bind)  
> [关于 echarts的简单入门使用代码](#about_echarts)  
> [关于物理像素,设备独立像素等内容的概念](#about_pixel)  
> [box-sizing属性](#box_sizing)  
> [JS运算符的优先级](#operator)  
> [一道有趣的JS代码题：](#js_problem_1)

### <span id="inheritance">关于继承 </span>

> 原型链：对象实例会集成其原型对象上的属性，原型对象也是一个对象，它也会集成它自己的原型对象拥有的属性，依此类推，这就是原型链。  

> 所有的对象，包括那些自己定义的对象都自动继承自Object，除非另有指定(这里的另有指定是什么意思?).更确切的说，所有对象都继承自 Object.prototype  

```javascript  
  var book = {title : "Learning Javascript"};
  var prototype = Object.getPrototypeOf(book);
  console.log(prototype === Object.prototype);// true
```  

### <span id="call_apply_bind">关于 call,apply,bind方法</span>  

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

### <span id="about_echarts">关于 echarts的简单入门使用代码：</span>   

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

### <span id="about_pixel">关于物理像素,设备独立像素等内容的概念</span>  
> 物理像素  

> 设备独立像素  

> 设备像素比(device pixel ratio)  
> 设备像素比=物理像素/设备独立像素  
> JS中可以通过 window.devicePixelRatio 获取到当前设备的dpr  
> css中可以通过 -webkit-device-pixel-ratio,-webkit-min-device-pixel-ratio,-webkit-max-device-pixel-ratio 进行媒体查询，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)  

[像素点](http://www.html-js.com/article/Mobile-terminal-H5-mobile-terminal-HD-multi-screen-adaptation-scheme%203041)  

### <span id="box_sizing">box-sizing属性</span>  

### <span id="operator">JS运算符的优先级</span>  
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


### <span id="js_problem_1">一道有趣的JS代码题：</span>  
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

### <span id="someNotes">一些细节的小问题</span>  
1. 需要注意的是，带src属性的<script>元素不应该在其<script>和</script>标签之间再包含额外的JS代码。就算嵌套了JS代码，也不会执行。而只会执行外部脚本文件。  
2. 在<script>元素中设置defer属性，相当于告诉浏览器立即下载，但延迟执行  

### 关于ES6的新特性：  
1. let,const,以及块级作用域：  
> const比较好理解，用于定义常量  
> 箭头函数语言简洁的特点使其特别适合用於单行回调函数的定义  

2. 模板字符串：  
> 两大特点：
> - 支持变量注入  
> - 支持换行  

3. 对象字面量扩展语法:  
> 方法属性省略 function  
> 支持 __proto__ 注入  
> 同名方法属性省略语法  
> 可以动态计算的属性名称  

4. 表达式解构  

### box-sizing属性：  
> border-box情况下，元素的内边距和边框不会影响元素的宽度  
> content-box情况下，元素的内边距和边框会影响元素的宽度  

### column-count和column-gap属性  

![](http://p1.bqimg.com/567571/083163c954f0aa4b.png)  

### 深浅拷贝一个对象  
> 浅拷贝一个对象，只拷贝一个对象的顶层的非object对象  
> 深拷贝一个对象，会一层一层拷贝直到最底层  
> jquery提供一个 extend方法可以实现浅拷贝和深拷贝:  
> 1.浅拷贝:  

```javascript
  var newObj = jQuery.extend({},oldObj);
```  

> 2.深拷贝:  

```javascript
  var newObj = jQuery.extend(true,{},oldObj);
```  


### 闭包常见用法:  
Modules,模块化。模块化能够让我们定义私有的实现细节(包括变量和方法)，使他们可以不受外部环境的污染，当然同时还能对外提供API接口。  

代码示例：  

```javascript
  function User(){
    var username,password;// 闭包

    function doLogin(user,pw){
      username = user;
      password = pw;
      // 执行剩余的登录操作
    }

    var publicAPI = {
      login : doLogin
    };

    // 放回公共的API
    return publicAPI;
  }

  // 创建一个 'User' 模块的实例
  var fred = User();
  fred.login("fred","12kelvin34");
```  

以上为什么不是用 new User()而是直接用 User()，原因在于这里的User并不是作为一个类的存在，而仅仅只是一个方法而已，所以在此是直接调用这个方法，而不是用new去实例化一个对象。用new不适合，也会浪费资源  

### 记录一个题目：  
写一个traverse函数,输出所有页面中宽度和高度大于50像素的节点:  

```javascript
  function traverse(node){
    // 利用到了递归遍历子节点
    var result = [];
    node = node || document.body;
    if(node.style){
      var width = parseInt(node.style.width) || 0;
      var height = parseInt(node.style.height) || 0;
      if(width>50 && height>50){
        result.push(node);
      }
    }
    var childNodes = node.childNodes;
    if(childNodes.length>0){
      for(var i=0;i<childNodes.length;i++){
        var tempNode = childNodes[i];
        result = result.concat(traverse(tempNode));
      }
    }
    return result;
  }

```

### 关于二叉树的前序遍历和中序遍历的JAVA实现:  

```java
  /**
   * Definition for a binary tree node.
   * public class TreeNode {
   *     int val;
   *     TreeNode left;
   *     TreeNode right;
   *     TreeNode(int x) { val = x; }
   * }
   */
   public class Solution{
     //  前序遍历
     public List<Integer> preorderTraversal(TreeNode root){
       List<Integer> list = new ArrayList<>();
       Stack<ListNode> stack = new Stack<>();
       while(root != null || !stack.empty()){
         while(root != null){
           list.add(root.val);
           stack.push(root);
           root = root.left;
         }
         root = stack.pop();
         root = root.right;
       }
       return list;
     }

    //  中序遍历
    public List<Integer> inorderTraversal(TreeNode root){
      List<Integer> list = new ArrayList<>();
      Stack<ListNode> stack = new Stack<>();
      while(root != null || !stack.empty()){
        while(root != null){
          stack.push(root);
          root = root.left;
        }
        root = stack.pop();
        list.add(root.val);
        root = root.right;
      }
    }
   }
```

### webpack中的两种 代码分离(code splitting)的方式  
1. 源码分离 ---- 为了缓存和并行加载  

2. 按需分析 ---- 按需进行代码分离  

### jquery ajax中支持的返回数据类型：  

dataType字段支持：

xml,html,script,json,jsonp,text  

### 常见浏览器端的存储技术：

cookie,WebStorage(localStorage,sessionStorage),userData,indexdDB

### 兼容性事件委托代码：  

```javascript
  document.addEventListener("click",function(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    // 需要默认事件
    e.preventDefault();
    // 阻止冒泡
    e.stopPropagation();
    // IE 下面执行下面的去取消默认事件和阻止冒泡
    //  e.returnValue = false;
    //  e.cancelBubble = true;
    switch(target):
      case : 1:
        // do something
      case : 2:
        // do something
      default:
        break;
  });
```

### JS设计模式

### 设计模式的类别(三种类别):

  - 创建型设计模式

    > 专注于处理对象创建机制

    包括：Constructor(构造器),Factory(工厂),Abstract(抽象),Prototype(原型),Singleton(单例),Builder(生成器)

  - 结构型设计模式

    > 专注于对象组合,不同对象之间建立关系

    包括：Decorator(装饰者),Facade(外观),Flyweight(享元),Adapter(适配器),Proxy(代理)

  - 行为设计模式

    > 行为模式专注于改善或简化系统中不同对象之间的通信

    包括：Iterator(迭代器),Mediator(中介者),Observer(观察者),Visitor(访问者)

### JS once function code  JS实现once函数-只执行一次的函数

```javascript 
function once(fn,context){
  var result;
  return function(){
    if(fn){
      result = fn.apply(context || this,arguments);
      fn = null;
    }
    return result;
  };
}

// use
var onlyOnce = once(function(){
  console.log("Do once!");
});

// can only do once!
onlyOnce();
onlyOnce();

```

###  Java List的使用

####  List的特点：

1. List长度可变，数组长度不可变

2. List中可以添加任何对象，包括自己定义的类

3. List是一个接口，不能直接实例化但是List下包含两个重要类ArrayList和LinkedList，需要通过ArrayList或者LinkedList才能实例化

4. 通过List.add(对象) 方法可以向集合添加任何类型的数据

5. 用List.get(索引序号) 方法从集合中取出数据  


### 准确获取屏幕的宽高尺寸

### Element.getBoundingClientRect()方法

返回元素的大小及其相对视口的位置


### 关于 callee

每一个函数又一个 arguments，arguments除了装有函数参数之外，还有一个 callee属性，这个属性是一个指针，指针指向拥有arguments对象的函数本身

下面是关于callee的一个应用示例：

典型的阶乘函数用到了递归方法：
```javascript
	function factorial(num){
		if(num<=1){
			return 1;
		}else{
			return num*factorial(num-1);
		}
	}
```

这里有一个问题就是，函数的执行与函数名耦合度太高了，为了降低函数执行与函数名字的耦合度，可以利用callee，然后解决这个问题，以后不管如何命名这个阶乘函数都可以：

```javascript
	function factorial(num){
		if(num<=1){
			return 1;
		}else{
			return num * arguments.callee(num-1);
		}
	}
```

### 关于ECMASCRIPT5 的属性类型：

ECMA5在定义只有内部才用的特性时，描述了属性的各种特征

ECMASCRIPT 中有两种属性：数据属性和访问器属性：

1.数据属性：

数据属性包含一个数据值的位置，在这个位置可以读取和写入值。数据属性有4个描述其行为的特性：

[[Configurable]]

[[Enumerable]]

[[Writable]]

[[Value]]

要修改属性默认的特性，必须使用ECMAScript 5的Object.defineProperty()方法, 该方法接收三个参数：属性所在的对象，属性的名字， 描述符对象。其中描述符对象的属性必须是：configurable,enumerable,writable和value。设置其中的一个或者多个值，可以修改对应的特性值。

2.访问器属性

访问器属性不包含数据值；它们包含一对getter和setter函数。在读取访问器属性时，会调用getter函数，这个函数负责返回有效的值。在写入访问器属性时，会调用setter函数并传入新值，这个函数负责决定如何处理数据。

访问器属性有如下4个特性：

[[Configurable]],[[Enumerable]],[[Get]],[[Set]]

访问器属性不能直接定义，必须使用Object.defineProperty()来定义。

3.定义多个属性：

方法：Object.defineProperties()


### 关于this

#### 关于this、有两个比较容易混淆、误解的地方

- Itself

很多时候 function 里面的 this 会被误解为指向function本身、实际上、这是错误的

- Its Scope

另一个比较会被误解的是、this指向的是function 的scope

### javascript 的scope

#### 什么是域

JS中、域指的是代码当前的上下文语境

#### 什么是全局域

当开始写第一行代码的时候、你正处于我们所说的全局域中、此时我们定义个变量、那它就被定义在全局域中：

```javascript
	// global scope
	var name = 'Kelvin';
```

#### 什么是本地域

本地域指那些在全局域中定义的域、一般只有一个全局域、定义在其中的每一个函数都有自己的本地域

任何定义在其他函数中的函数都有一个连接那个外部函数的本地域

```javascript
	// Scope A : Global scope out here
	var myFunc = function(){
		// Scope B : Local scope in here
	};
```

 任何属于本地域的物件对全局域都是不可见的、除非他们被暴露出去了

#### 函数域

在JS中所有的域都是并且只能被函数域所创建

#### 词法定义域

当我们在一个函数中再创建一个函数、这个内部的函数可以访问外部函数的属性、这被称为词法定义域或是闭包、有时也称作静态域

#### 域链

域链给一个已知的函数建立了作用域。

每一个被定义的函数都有自己的嵌套作用域、同时、任何被定义在其他函数中的函数都有一个本地域域连接着外部的函数、这种连接被称作链

这就是在代码中定义作用域的地方。当我们在处理一个变量的时候，JavaScript就会开始从最里层的域向外查找直到找到要找的那个变量、对象或函数。

#### 作用域和 this 关键字

每一个作用域都会根据函数的调用方式来绑定不同的this值

#### 用 call、apply和bind来改变作用域

看两个例子：

- 正常的this作用域

```javascript
	var links = document.querySelectorAll('nav li');
	for(var i=0;i<links.length;i++){
		console.log(this);// [object window]
	}	
```

- 利用call、apply来改变作用域

```javascript
	var links = document.querySelectorAll('nav li');
	for(var i=0;i < links.length;i++){
		(function(){
			console.log(this);
		}).call(links[i]);
	}
```

某些情况下请使用call或apply来执行函数、而不是像下面这样去执行：

```javascript
	myFunc();
```

使用 call或apply：

```javascript
	myFunc.call(scope);
```

#### bind() 方法

#### 私有域和公共域

很多语言都有共有域和私有域、javascript并没有这个机制、只能通过闭包来模拟

模块模式：

```javascript
	var module_1 = (function(){
		var _privateFunc = function(){};
	
		var publicFunc = function(){};

		var anotherPublicFunc = function(){};

		return {
			publicMethod : publicFuncm,
			anotherMethod : anotherPublicFunc
		}
	})();

	// call
	module_1.publicMethod();

```

#### 理解原型对象

无论什么时候、只要创建一个函数、就会根据一组特定的规则为该函数创建一个prototype属性、这个属性指向函数的原型对象

默认情况下、所有原型对象都会自动获得一个constructor（构造函数）属性、这个属性包含一个指向prototype属性所在函数的指针

相当于：function 都有一个 prototype 、prototype指向函数的原型对象、而每个原型对象都有一个constructor、它包含一个指向prototype属性所在函数的指针

#### 基于h5的上传图片组件开发思路

##### 基于FileReader和FormData.

##### 流程

1.init

初始化

2.render

渲染dom结构

3.upload

上传
