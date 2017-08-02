// 实现MVVM的数据绑定

// 1.实现Observer
var data = {
    name: 'Jony J',
    eduExp: {
        school: 'BUPT',
        time: '2015-2018',
        grade: 'special'
    },
    list: [1,2,3,4]
};
observer(data);
data.name = 'PG one';
data.eduExp.school = 'PKU';
data.list[0] = 10;
data.list[1] = 100;

function observer(data){
    if(!data || typeof data !== 'object'){
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function(key){
        defineReactive(data, key, data[key]);
    });
}

function defineReactive(data, key, val){
    var dep = new Dep();// 每个data的属性值都需要一个订阅器来维护订阅的事情
    observer(val); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true,// 可枚举
        configurable: false,// 不可再次define
        get: function(){
            // 由于需要在闭包内添加watcher，所有通过Dep定义一个全局target属性，暂存watcher，添加完移除
            Dep.target && dep.addSub(Dep.target);
            return val;
        },
        set: function(newVal){
            if(val === newVal){
                return;
            }
            console.log('监听到值的变化、从 ' + val + '变成： ' + newVal);
            val = newVal;
            dep.notify();// 通知所有订阅者
        }
    })
}

// 以上完成监听data的每一个数据变化、监听变化之后需要通知订阅者、所以接下来要实现一个消息订阅器
function Dep(){
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub){
        this.subs.push(sub);
    },
    notify: function(){
        this.subs.forEach(function(sub){
            sub.update();
        });
    }
};

function Watcher(vm, exp, cb){
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    // 此处为了触发属性的getter，从而在dep中添加自己
    this.value = this.get();
}

Watcher.prototype = {
    update: function(){
        this.run();
    },
    run: function(){
        var value = this.get();// 取得最新的值
        var oldVal = this.value;
        if(value !== oldVal){
            this.value = value;
            this.cb.call(this.vm, value, oldVal);// 执行compile中绑定的回掉，更新视图
        }
    },
    get: function(){
        Dep.target = this;// 将当前订阅者指向自己
        var value = this.vm[exp];// 触发属性的getter、从而添加订阅者
        Dep.target = null;// 添加完毕，重置
        return value;
    }
};

function Compile(el){
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if(this.$el){
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    init: function(){
        this.compileElement(this.$fragment);
    },
    node2Fragment: function(el){
        var fragment = document.createDocumentFragment(),
            child;
        while(child = el.firstChild){
            fragment.appendChild(child);
        }
        return fragment;
    },
    compileElement: function(el){
        var childNodes = el.childNodes,
            me = this;
        [].slice.call(childNodes).forEach(function(node){
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;
            if(me.isElementNode(node)){
                me.compile(node);
            }else if(me.isTextNode(node) && reg.test(text)){
                me.compileText(node, RegExp.$1);
            }

            // 遍历编译子节点
            if(node.childNodes && node.childNodes.length){
                me.compileElement(node);
            }
        });
    },
    compile: function(node){
        var nodeAttrs = node.attributes,
            me = this;
        [].slice.call(nodeAttrs).forEach(function(attr){
            // 规定指令以 v-xxx 命名
            var attrName = attr.name;
            if(me.isDirective(attrName)){
                var exp = attr.value; // 内容
                var dir = attrName.substr(2);// text
                if(me.isEventDirective(dir)){
                    // 事件指令、如 v-on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                }else{
                    // 普通指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
            }
        });
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp){
        var updaterFn = updater[dir + 'Updater'];
        // 第一次初始化视图
        updaterFn && updaterFn(node, vm[exp]);
        // 实例化订阅者、此操作会在对应的属性消息订阅器中添加该订阅者watcher
        new Watcher(vm, exp, function(value, oldValue){
            updaterFn && updaterFn(node, value, oldValue);
        });
    }
};

// 更新函数
var updater = {
    textUpdater: function(node, value){
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
};

// MVVM入口实现
function MVVM(options){
    this.$options = options;
    var data = this._data = this.$options.data,
        me = this;
    // 属性代理，实现 vm.xxx ---> vm._data.xxx
    Object.keys(data).forEach(function(key){
        me._proxy(key);
    });
    observer(data);
    this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
    _proxy: function(key){
        var me = this;
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter(){
                return me._data[key];
            },
            set: function proxySetter(newVal){
                me._data[key] = newVal;
            }
        });
    }
};