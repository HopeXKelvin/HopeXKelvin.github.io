// 观察者
// 利用 Object.defineProperty()来监听属性变动、所以需要observer的数据对象进行递归遍历、包括子对象的属性、都加上setter和getter
// 这样给这个数据对象的某个属性赋值、就会触发setter、从而监听到数据的变化

function Observer(data){
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function(data){
        var me = this;
        // 获取data的所有属性key,遍历然后进行convert操作
        Object.keys(data).forEach(function(key){
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val){
        this.defineReactive(this.data, key, val);
    },
    defineReactive: function(data, key, val){
        var dep = new Dep();// 订阅器
        var childObj = observer(val);// 递归遍历 绑定 设定setter和getter

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function(){
                if(Dep.target){
                    dep.depend();
                }
            },
            set: function(newVal){
                if(newVal === val){// 值没有发生变化无需更新
                    return;
                }
                val = newVal;
                // 新的值若是object的话，进行监听、observer方法内部会进行判断
                childObj = observer(newVal);
                // 值发生改变 通知订阅者
                dep.notify();
            }
        });
    }
};

function observer(value, vm){
    if(!value || typeof value !== 'object'){
        return;
    }
    return new Observer(value);
}

var uid = 0;

function Dep(){
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub){
        this.subs.push(sub);
    },
    depend: function(){
        // 添加 绑定 依赖
        Dep.target.addDep(this);
    },
    removeSub: function(sub){
        var index = this.subs.indexOf(sub);
        if(index != -1){
            // 删除订阅者
            this.subs.splice(index, 1);
        }
    },
    notify: function(){
        // 通知订阅者
        this.subs.forEach(function(sub){
            sub.update();
        });
    }
};

Dep.target = null;