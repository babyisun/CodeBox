var screenH = $(window).height(),
    screenW = $(window).width(),
    //InterfaceURL = "http://localhost:8082/cig_DataInterface_web",
    //InterfaceURL = "http://172.16.8.111:8084/cig_DataInterface_web/",
    isFrist = 2,
    signData = [],
    messageData = [],
    bgWidth = 5477 / 4381 * screenH,
    speed = 3000,
    $photo = $(".person_photo"),
    flag = null,
    $title = $(".title"),
    $name = $(".name"),
    $walls = $(".msg-walls");

$(function () {
    $(".container").css({
        width: bgWidth + 'px'
    });
    $photo.css({
        width: 1622 / 5477 * bgWidth + 'px',
        height: 1622 / 5477 * bgWidth + 'px',
        marginLeft: 1907 / 5477 * bgWidth + 'px'
    });
    $(".person h2").css({
        fontSize: 218 / 5477 * bgWidth + 'px',
        height: 218 / 5477 * bgWidth + 'px',
        lineHeight: 218 / 5477 * bgWidth + 'px',
        marginTop: 464 / 5477 * bgWidth + 'px',
        marginBottom: 80 / 5477 * bgWidth + 'px',
    });
    $(".img").css({width: 2317 / 5477 * bgWidth + 'px'});
    $(".bottom").css({
        height: 834 / 5477 * bgWidth + 'px'
    });
    $(".erweima").css({
        marginTop: (834 / 5477 * bgWidth - 655 / 5477 * bgWidth) / 2 + 'px',
        marginRight: 133 / 5477 * screenW + 'px',
        marginLeft: 217 / 5477 * screenW + 'px',
        width: 655 / 5477 * bgWidth + 'px',
        height: 655 / 5477 * bgWidth + 'px'
    });
    $walls.css({
        marginLeft: 124 / 5477 * screenW + 'px',
        width: 4350 / 5477 * screenW + 'px',
        height: 834 / 5477 * bgWidth + 'px'
    });

    var limit = window.prompt("大会专用，请输入密码：", "请在此输入登录密码");
    if (limit != "cig123") {
        document.write("无权访问");
        return;
    }

    fnSign();
    setInterval(fnSign, 5000);
    fnMessage();
    setInterval(fnMessage, 5000);
    //头像播放
    fnPlay();
    flag = setInterval(fnPlay, speed);
    //留言播放
    fnDanMu();
    setInterval(fnDanMu, 2000);


    $(document).keydown(function (event) {
        switch (event.keyCode) {
            case 38:
                //方向键向上
                speed += 1000;
                console.log('当前的播放速度已调整为:' + speed / 1000 + "s一张");
                clearInterval(flag);
                flag = setInterval(fnPlay, speed);
                break;
            case 40:
                //方向键向下
                if (speed != 1000) speed -= 1000;
                console.log('当前的播放速度已调整为:' + speed / 1000 + "s一张");
                clearInterval(flag);
                flag = setInterval(fnPlay, speed);
                break;
        }
        ;
        return false;
    });

});

function fnPlay() {
    if (!signData.length) {
        return;
    }
    var _data = signData.dequeue();
    $title.fadeOut();
    $name.fadeOut();
    setTimeout(function () {
        $title.html(_data.orgName).fadeIn();
        $name.html(_data.employeeName).fadeIn();
    }, 500);
    $photo.removeClass("rotateIn").addClass("rotateOut");
    if (_data.picUrl == '' || _data.picUrl == null) {
        $photo.find('img').attr('src', '../images/default.png');
        setTimeout(function () {
            $photo.removeClass("rotateOut").addClass("rotateIn");
        }, 500);
    } else {
        $photo.find('img').attr('src', _data.picUrl);
        setTimeout(function () {
            $photo.removeClass("rotateOut").addClass("rotateIn");
        }, 500);
    }
}

function fnDanMu() {
    if (!messageData.length) {
        return;
    }
    var _data = messageData.dequeue();
    var randomClass = ['blue', 'pink'];
    var randomClassName = ~~(Math.random() * 2);
    //console.log(randomClassName);
    var top = ['10%', '40%', '70%'];
    var _index = ~~(Math.random() * 3);
    var _html = '<span class="danmu ' + randomClass[randomClassName] + '" style="top:' + top[_index] + '">' + decodeURIComponent(_data.message) + '</span>';
    $walls.append(_html);
    $(".danmu").css({
        height: 193 / 5477 * bgWidth + 'px',
        lineHeight: 193 / 5477 * bgWidth + 'px',
        fontSize: 100 / 5477 * bgWidth + 'px',
        paddingLeft: 197 / 5477 * bgWidth + 'px',
        paddingRight: 197 / 5477 * bgWidth + 'px',
        borderRadius: 193 / 5477 * bgWidth / 2 + 'px'
    });
}
//签到接口 全量
function fnSign() {
    $.ajax({
        type: 'POST',
        url: ED_Mobile.SignInterfaceURL + '/interface/ActivityController/queryActivitySignList',
        data: {mode: isFrist},
        success: function (data) {
            console.log(data);
            isFrist = 1;
            //模拟数据
            if (data.code == 1) {
                signData.addRange(data.listData);
            }

        }
    });
}
//获取留言接口
function fnMessage() {
    $.ajax({
        type: 'POST',
        url: ED_Mobile.SignInterfaceURL + '/interface/ActivityController/queryActivityMessageList',
        data: {},
        success: function (data) {
            console.log(data);
            if (data.code == 1) {
                messageData.addRange(data.listData);
            }
        }
    });
}