$(function () {
    var screenWidth = $(window).width();
    $(".title").css({height: 217 / 750 * screenWidth + 'px'});
    $(".form1").css({height: 275 / 750 * screenWidth + 'px'});
    $(".form1 p").css({
        height: 40 / 750 * screenWidth + 'px',
        lineHeight: 40 / 750 * screenWidth + 'px',
        fontSize: 30 / 750 * screenWidth + 'px',
        paddingTop: 24 / 750 * screenWidth + 'px',
        paddingBottom: 20 / 750 * screenWidth + 'px'
    });
    $(".form2").css({height: 286 / 750 * screenWidth + 'px'});
    $("textarea").css({
        height: 190 / 750 * screenWidth - 12 + 'px',
        width: (screenWidth - 20) * 0.98 - 2 + 'px',
        fontSize: 26 / 750 * screenWidth + 'px'
    });
    $("span.number").css({
        height: 40 / 750 * screenWidth + 'px',
        fontSize: 40 / 750 * screenWidth + 'px',
        lineHeight: 40 / 750 * screenWidth + 'px'
    });

    var tips = [
        "留言成功啦^_^",
        "成功上墙！",
        "Success!",
        "您的旨意已传达.."
    ];
    //$.alert(tips[Math.floor(Math.random() * tips.length)]);
    ED_Mobile.getUid(function (data) {
        //返回了uid
        var uid = data.uid;
        // get Number
        $.ajax({
            type: "POST",
            url: ED_Mobile.SignInterfaceURL + '/interface/ActivityController/activitySign',
            data: {employeeCode: uid},
            success: function (res) {
                if (res.result) {
                    $(".number").html(res.data);
                } else {
                    $.alert(res.message);
                }
            }
        });
        //publish message
        $(".btn-submit").click(function () {
            var _dom_msg = $("#message");
            var _message = _dom_msg.val();
            if (!_message) {
                $.alert("留言不能为空喔！");
                return;
            }
            $.ajax({
                type: "GET",
                url: ED_Mobile.SignInterfaceURL + '/interface/ActivityController/activityMessage',
                data: {employeeCode: uid, message: encodeURIComponent(_message)},
                success: function (res) {
                    if (res.result) {
                        $.alert(tips[Math.floor(Math.random() * tips.length)]);
                        _dom_msg.val("");
                    } else {
                        $.alert(res.message);
                    }
                }
            });
        });
    })
});