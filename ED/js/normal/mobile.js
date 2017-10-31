/**
 * Created by shiyang on 2016/10/19.
 */
//对象转字符串JSON.stringify
var Mobile_Base = {
    IOS: function () {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    Android: function () {

        return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
    },
    setupWebViewJavascriptBridge: function (callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0);
    },
    action: function (data, callback) {
        if (this.IOS()) {
            if (!window.webkit || !window.webkit.messageHandlers || !window.webkit.messageHandlers.ED) {
                $.alert("用意点扫描吧~", 10000);
                return false;
            }
            this.setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('ED.Mobile', data, function (response) {
                    if (callback)
                        callback(response);
                });
            });
            return true;
        } else if (this.Android()) {
            if (!window.ED || !window.ED.Mobile) {
                $.alert("用意点扫描吧~");
                return false;
            }
            if (callback) {
                var _data = window.ED.Mobile(JSON.stringify(data));
                callback(_data);
            }
            else
                window.ED.Mobile(JSON.stringify(data));
            return true;
        } else {
            console.log("PC不支持此方法，请在手机端实验");
            console.log(data);
            return false;
        }
    }
}

var ED_Mobile = {
    SignInterfaceURL: "http://" + location.host + "/cig_DataInterface_web/",
    UID: "uid",
    USERINFO: "USERINFO",
    isIOS: function () {
        alert("IOS：" + Mobile_Base.IOS() + ",Android:" + !Mobile_Base.IOS());
    },
    //获取用户信息
    getUid: function (callback) {
        //return callback({uid: 12371});
        var _this = this, _cdata = $.cookie.get(_this.UID);
        if (_cdata && callback) {
            var _data = JSON.parse(_cdata);
            _data && callback(_data);
        }
        else {
            Mobile_Base.action({method: "getUid"}, function (data) {
                    if (data) {
                        var _data = JSON.parse(data);
                        if (_data) {
                            $.cookie.set(_this.UID, data);
                            setTimeout(function () {
                                if (callback)
                                    callback(_data);
                            }, 100);
                        }
                    }
                }
            );
        }
    }
}