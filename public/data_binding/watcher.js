/**
 * @params参数说明
 * vm vm对象
 * expOrFn 表达式或方法
 * cn 回掉函数
 */

// 订阅者 Dep对象的 subs数组中维护者这些 订阅者
function Watcher(vm, expOfFn, cb){
    this.cb = cb;
    this.vm = vm;
    this.expOfFn = expOfFn;
    this.depIds = {};

    if(typeof expOfFn === 'function'){
        this.getter = expOfFn;
    }else{
        this.getter = this.parseGetter(expOfFn);
    }

    this.value = this.get();
}

Watcher.prototype = {
    update: function(){
        this.run();
    },
    run: function(){
        // 更新视图
        var value = this.get();
        var oldVal = this.value;
        if(value !== oldVal){
            this.value = value;
            // 值发生改变-触发回掉-更新视图
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep){
        if(!this.depIds.hasOwnProperty(dep.id)){
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    },
    get: function(){
        Dep.target = this;// 为了 触发 get。Dep.target 不为空
        var value = this.getter.call(this.vm, this.vm);// 
        Dep.target = null;// 设置完了 又要置为 null
        return value;
    },
    parseGetter: function(exp){
        // 这个正则是要匹配什么??
        if(/[^\w.$]/.test(exp)){
            return;
        }

        var exps = exp.split('.');

        return function(obj){
            for(var i=0, len=exps.length;i<len;i++){
                if(!obj){
                    return;
                }
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
};