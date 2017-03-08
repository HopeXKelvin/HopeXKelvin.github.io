# FE-学习笔记  

### 关于继承  

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
