// 观察者
// 利用 Object.defineProperty()来监听属性变动、所以需要observer的数据对象进行递归遍历、包括子对象的属性、都加上setter和getter
// 这样给这个数据对象的某个属性赋值、就会触发setter、从而监听到数据的变化

/**
 * 第一版、初版代码
 */
var data = {name: 'hope_kelvin'};

function observer(data){
    if(!data || typeof data !== 'object'){
        return;
    }
    // 取出所有属性key、进行遍历
    Object.keys(data).forEach(function(key){
    });
}

function defineReactive(date, key, val){
    var dep = new Dep();
    observer(val);// 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function(){
            Dep.target && dep.addSub(Dep.target);
            return val;
        },
        set: function(newVal){
            if(val === newVal){
                return;
            }
            console.log('监听到值发生变化，从' + val + '------>' + newVal);
            val = newVal;
            dep.notify();// 通知所有订阅者
        }
    });
}

// 订阅器 维护一组订阅者数组
function Dep(){
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub){
        // 添加订阅者
        this.subs.push(sub);
    },
    depend: function(){
    },
    notify: function(){
        // 通知
        this.subs.forEach(function(sub){
            sub.update();
        });
    }
};

// 订阅者 watcher
function Watcher(){}

Watcher.prototype = {
    update: function(){
        this.run();
    },
    run: function(){
        var value = this.get();
        var oldVal = this.value;
        if(value !== oldVal){
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(){},
    get: function(key){
        Dep.target = this;
        this.value = data[key];// 这里会触发属性的getter、从而添加订阅者
        Dep.target = null;
    }
};