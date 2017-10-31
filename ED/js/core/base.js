import Domain from "../../../../../ReactUI/src/js/core/Domain";
import {Ajax, BASECODE} from "../../../../../ReactUI/src/js/core/AJAX";
import {Customer} from "../../../../../ReactUI/src/js/core/util";

export const CODE = BASECODE;
export const LOGIN_PAGE = "/login";
var host = location.host;
const PROTOCOL = new Domain().Protocol;


//站点根目录;
export const BASE_STATIC = PROTOCOL + new Domain().staticUrl() + "/DmaScreenUI/build/Mazda/";
export const ROOTURL = PROTOCOL + host;
export var ACTION = ROOTURL + '/';
console.log(ACTION);

export class AJAX {
    constructor() {

    }

    static randomNum() {
        return {r: Date.parse(new Date()) + ~~(Math.random() * 1000)};
    }

    static get(url, data, callback, error) {
        $.ajax({
            type: "GET",
            url: ACTION + url,
            data: data,
            success: function (data) {
                if (!data)
                    return;
                if (data.code == BASECODE.SUCCESS || data.code == BASECODE.ERROR) {
                    if (callback)
                        callback(data);
                } else if (data.code == BASECODE.NOLOGIN) {
                    location.href = data.msg.data.url;
                }
                /*else {
                 $.alert(data.msg, 2000, error);
                 }*/
            },
            error: error
        });
    }

    static post(url, data, callback, error) {
        //console.log(USER);
        $.ajax({
            type: "POST",
            url: ACTION + url,
            data: data,
            success: function (data) {
                if (!data)
                    return;
                if (data.code == BASECODE.SUCCESS || data.code == BASECODE.ERROR) {
                    if (callback)
                        callback(data);
                } else if (data.code == BASECODE.NOLOGIN) {
                    location.href = data.msg.data.url;
                }
                /*else {
                 $.alert(data.msg, 2000, error);
                 }*/
            },
            error: error
        });
    }

}


export class DfnUtil {
    static setfontSize (coefficient) {
        let _ww = $(window).width();
        return _ww >= '1920' ? coefficient : _ww * coefficient / 1920
    }
    /*参数为比例系数*/
    /*static setfontSize(coefficient,fs) {
        let _ww = $(window).width();
        return $.browser.mobile ? (fs ? fs:12) :_ww / coefficient;
    }

    static setBarWidth(screenWidth) {
        let _ww = $(window).width();
        return _ww * screenWidth / 1920
    }

    // 传入1366屏幕下字号
    static setfontSize_Size1366(fontSize,fs) {
        let _ww = $(window).width();
        return $.browser.mobile && _ww<=750 ? (fs ? fs:12) :_ww * fontSize / 1366;
    }
    static setFunnelMargin(offset){
        let _ww = $(window).width();
        return _ww * offset / 320;
    }

    /!*
     * name对应的dom对象name
     * No 图形编号
     * title 图表名称
     *!/
    static saveAsImageByPHP(name, No, title, other, type = 2) {
        let dom = this.refs[name];
        if (!dom) {
            console.log("没有找到图形对象");
            return;
        }
        let _img = dom.chart.getDataURL('png'),
            param = {chart_num: No, title: title, val: _img, client_id: AJAX.randomNum().r, type: type};
        $.extend(param, other);
        AJAX.post("down_image/dl_img", param, (data)=> {
            console.log(data);
            if (data.code == CODE.SUCCESS) {
                //console.log(document.createEventObject);
                if (!$.browser.msie) {
                    let link = document.createElement('a');
                    link.href = data.msg.data;
                    link.download = title + "-" + new Date().format("yyyyMMddhhmmss") + '.png';
                    let event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    link.dispatchEvent(event);
                } else {
                    window.open(data.msg.data);
                }
            }
        });
    }

    //导出echarts图片，不支持ie
    static saveAsImage(name) {
        let dom = this.refs[name];
        if (!dom) {
            console.log("没有找到图形对象");
            return;
        }
        let _img = dom.chart.getDataURL('png'),
            image = _img.replace("image/png", "image/octet-stream");
        let link = document.createElement('a');
        link.href = image;
        link.download = name + "-" + new Date().format("yyyyMMddhhmmss") + '.png';
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
        /!*if (!document.createEventObject) {
         let event = document.createEvent('MouseEvents');
         event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
         link.dispatchEvent(event);
         } else {
         let event = document.createEventObject();
         element.fireEvent('onclick', event);
         }*!/

        //var image    = _img.toDataURL("image/png");
        //window.location.href = _img;
        // var w = window.open('about:blank', 'image from canvas');
        // w.document.write("<img src='" + image + "' alt='from canvas'/>");
    }

    //添加单位（万）
    static addUnit(value,fixedNum) {
        if (value < 10000) {
            return ('' + value).formatNumber();
        }
        return fixedNum || fixedNum == 0 ? ('' + (value / 10000).toFixed(fixedNum)).formatNumber() + '万' : ('' + (value / 10000).toFixed(1)).formatNumber() + '万';
    }*/
}
