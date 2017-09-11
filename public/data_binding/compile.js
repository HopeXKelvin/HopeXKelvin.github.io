// 编译dom的类
function Compile(el, vm){
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if(this.$el){
        this.$fragment = this.node2Fragment(this.$el);// 劫持dom、把el下面的所有dom取到、放到$fragment里面
        this.init();// 编译dom入口函数
        this.$el.appendChild(this.$fragment);// 初始化、绑定好所有的对象后、在append回到原来的dom结构中
    }
}

// Compile的各种方法
Compile.prototype = {
    init: function(){
        // 初始化方法
        this.compileElement(this.$fragment);// 对劫持的dom进行编译
    },
    node2Fragment: function(el){
        // 将dom节点转换成documentFragement的方法
        // 目的是为了劫持dom结构
        var fragment = document.createDocumentFragment(),
            child;
        // 将el下面的所有节点都拷贝到fragment
        while(child = el.firstChild){
            fragment.appendChild(child);
        }
        return fragment;
    },
    compileElement: function(el){
        // 编译 识别 el中的需要绑定的数据
        var childNodes = el.childNodes,
            me = this;
        // childNodes不是真正的数组、这里做一个转换、然后操作里面的每一个节点
        [].slice.call(childNodes).forEach(function(node){
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;// 匹配 所有 {{*}} 并且能

            if(me.isElementNode(node)){
                me.compile(node);
            }else if(me.isTextNode(node) && reg.test(text)){
                me.compileText(node, RegExp.$1);
            }

            // 递归遍历子节点
            if(node.childNodes && node.childNodes.length){
                me.compileElement(node);
            }
        });
    },
    compile: function(){
        // 编译处理 ELEMENT_NODE节点
        var nodeAttrs = node.attributes,
            me = this;
        
        [].slice.call(nodeAttrs).forEach(function(attr){
            var attrName = attr.name;
            if(me.isDirective(attrName)){
                // 该属性是指令
                var exp = attr.value;// 属性的值
                var dir = attrName.substring(2);// 截取事件名字
                // 事件指令
                if(me.isEventDirective(dir)){
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                }else{
                    // 普通指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 移除掉该指令属性
                node.removeAttribute(attrName);
            }
        });
    },
    compileText: function(node, exp){
        // 编译 TEXT_NODE节点
        compileUtil.text(node, this.$vm, exp);
    },
    isDirective: function(attr){
        // 判断是否为 指令
        return attr.indexOf('v-') === 0;
    },
    isEventDirective: function(dir){
        // 判断是否为事件指令
        return dir.indexOf('on') === 0;
    },
    isElementNode: function(node){
        // 判断是否为 ELEMENT_NODE 类型
        return node.nodeType == 1;
    },
    isTextNode: function(node){
        // 判断是否为 TEXT_NODE 类型
        return node.nodeType == 3;
    }
};

// 指令处理方法集合
var compileUtil = {
    text: function(node, vm, exp){
        this.bind(node, vm, exp, 'text');
    },
    html: function(node, vm, exp){
        this.bind(node, vm, exp, 'html');
    },
    model: function(node, vm, exp){
        this.bind(node, vm, exp, 'model');
        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e){
            var newValue = e.target.value;
            if(val === newValue){
                return;
            }
            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    class: function(node, vm, exp){
        this.bind(node, vm, exp, 'class');
    },
    bind: function(node, vm, exp, dir){
        var updaterFn = updater[dir + 'Updater'];
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // 实例化一个订阅者 Watcher
        new Watcher(vm, exp, function(value, oldValue){
            // 绑定指令上面 声明的事件
            updaterFn && updaterFn(node, value, oldValue);
        });
    },
    eventHandler: function(node, vm, exp, dir){
        // 事件处理
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];
        if(eventType && fn){
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    _getVMVal: function(vm, exp){
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k){
            val = val[k];
        });
        return val;
    },
    _setVMVal: function(vm, exp, value){
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i){
            // 非最后一个key，更新val的值 ??? 懵逼了? what?
            if(i < exp.length-1){
                val = val[k];
            }else{
                val[k] = value;
            }
        });
    }
};

// updater是什么鬼?------->应该是更新函数 订阅者的更新在这里.更新DOM------- 其实这里是操作dom的部分
// 首次初始化dom和后面更新dom的时候都会调用 更新视图的部分
var updater = {
    textUpdater: function(node, value){
        // 更新普通文本视图
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    htmlUpdater: function(node, value){
        // 更新 html
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    classUpdater: function(node, value, oldValue){
        // 更新 class
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/,'');
        var space = className && String(value) ? ' ' : '';// 空格
        node.className = className + space + value;
    },
    modelUpdater: function(node, value, oldValue){
        // 更新 带输入的dom结构的数值
        node.value = typeof value == 'undefiend' ? '' : value;
    }
};