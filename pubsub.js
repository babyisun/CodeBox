/*
 * Author   : North(shiyang)
 * Blog     : http://www.itbbb.com
 * Wechat   : ITbeibei
 * Email    : babyisun@qq.com
 *
 * create   : 2017/11/24
 * update   : 2016/11/24
 * example  : 订阅事件A
                var callback=function(data){console.log(data);}
		        pubsub.on('A', callback);
		
		      触发事件A
                pubsub.emit('A', '我是参数');
                
		      删除事件A的callback订阅源
		        pubsub.off('A', callback);
 **/
export class PubSub {
    constructor() {
        this.handlers = {};
    }
    
    //添加订阅
    on(eventType, handler) {
        var self = this;
        if (!(eventType in self.handlers)) {
            self.handlers[eventType] = [];
        }
        self.handlers[eventType].push(handler);
        return this;
    }

    // 触发事件(发布事件)
    emit(eventType) {
        var self = this;
        var handlerArgs = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < self.handlers[eventType].length; i++) {
            self.handlers[eventType][i].apply(self, handlerArgs);
        }
        return this;
    }

    // 删除订阅事件
    off(eventType, handler) {
        var currentEvent = this.handlers[eventType];
        var len = 0;
        if (currentEvent) {
            len = currentEvent.length;
            for (var i = len - 1; i >= 0; i--) {
                if (currentEvent[i] === handler) {
                    currentEvent.splice(i, 1);
                }
            }
        }
        return this;
    }
}