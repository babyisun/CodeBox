(function(window, ducument, $) {

    //日历
    var _calendar, $calendar;
    $(".time_fil").click(function() {
        var _this = $(this);
        if ($calendar) {
            $calendar.show();
        } else {
            var options = $.extend({}, options, {
                calendarID: "time_calendar",
                callback: function(_calendar) {
                    var selectDate = _calendar.getSelectedDate(); //获取选中日期
                    var startdate = dateExtend.format(new Date(selectDate[0]), 'MM.DD'),
                        enddate = dateExtend.format(new Date(selectDate[1]), 'MM.DD');
                    _this.find('#time_calendar_value').html(startdate + "-" + enddate);
                }
            });
            _calendar = new Calendar(options);
            _calendar.setSelectedDate(dateExtend.format(new Date(), "YYYY-MM-DD") + "," + dateExtend.format(dateExtend.add(new Date(), 1), "YYYY-MM-DD"));
            $calendar = $("#time_calendar").show();
        }

        _calendar.settings.isOpen = true;
        //打开前滚轮高度
        _calendar.settings.currScrollTop = $(window).scrollTop();
        //定位到开始日期高度
        var selectDate = _calendar.getSelectedDate(); //获取选中日期
        var _startT = dateExtend.format(new Date(selectDate[0]), "YYYY-MM-01"),
            _startDom = $calendar.find('span[data-date="' + _startT + '"]'),
            _startPos = _startDom.offset();
        console.log(_startPos);
        $(window).scrollTop(_startPos.top);
    });

    //登录菜单
    $(".icon-list").click(function() {
        console.log(1);
        if ($(".logo-lis").css("display") == "none") {
            $(".logo-lis").show();
        } else {
            $(".logo-lis").hide();
        }
    });

    // 滑块
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 1000,
        values: [75, 300],
        slide: function(event, ui) {
            $("#amount").val("￥" + ui.values[0] + " - ￥" + ui.values[1]);
        }
    });
    $("#amount").val("￥" + $("#slider-range").slider("values", 0) +
        " - ￥" + $("#slider-range").slider("values", 1));


    // 点击菜单心
    $(".icon-xiangqu").click(function() {
        $(this).toggleClass("active");
    });

    // 点击筛选
    $(".navs li").click(function() {
        var classn = $(this).attr("class");
        if ($(this).hasClass("active")) {
            $(this).toggleClass("active");
            $(this).children("a").children("i").toggleClass("trigelDown");
            $(this).children("a").children("i").toggleClass("trigelUp");
            $(".filter").children(".curr").removeClass("curr").addClass("hide");
        } else {
            $(".navs li").removeClass("active");
            $(".navs li i").removeClass("trigelUp").addClass("trigelDown");
            $(this).toggleClass("active");
            $(this).children("a").children("i").toggleClass("trigelDown");
            $(this).children("a").children("i").toggleClass("trigelUp");

            $(".filter").children(".curr").removeClass("curr").addClass("hide");
            switch (classn) {
                case "time_fil":
                    $(".time").removeClass("hide").addClass("curr");
                    break;
                case "area_fil":
                    $(".area").removeClass("hide").addClass("curr");
                    var dHeight=$(document).height();
                    $(".area").height(dHeight-174);
                    break;
                case "more_fil":
                    $(".more").removeClass("hide").addClass("curr");
                    var dHeight=$(document).height();
                    $(".more").height(dHeight-134);
                    break;
                case "reco_fil":
                    $(".recommend").removeClass("hide").addClass("curr");
                    break;
            }
        }
    });

    //点击客人数量
    $(".custom li").click(function() {
        $(".custom li").not(this).removeClass("active");
        $(this).toggleClass("active");
    })

    //点击房源类型
    $(".type>div").click(function() {
        $(".type div").not(this).removeClass("active");
        $(this).toggleClass("active")
    })

    //点击便利施舍
    $(".facilities>div").click(function() {
        $(".facilities div").not(this).removeClass("active");
        $(this).toggleClass("active")
    })

    //排序
    $(".recommend .abled").click(function() {
        $(".recommend .abled").not(this).removeClass("active");
        $(this).toggleClass("active");
        $(".reco_fil").removeClass("active").children('a').html($(this).html() + '<i class="trigelDown">');
        $(".recommend").addClass("hide").removeClass("curr");
    })

    //收藏
    $(".favor").click(function() {
        $(this).toggleClass("active");
    })
    
            var mySwiper= new Swiper(".swiper-container",{
            pagination:".swiper-pagination",
            loop:true,
            observer:true,
            observeParents:true
    });

})(window, document, $);