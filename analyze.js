//only use to current version 绩效分析
var finished = location.href.indexOf("gettoseeperf") > 0, _dom = finished ? $(".tablebox:eq(1)") : $("#perf_table");
var KPI_Action = function (finished) {
    try {
        var total = 0;
        _dom.find("tr").each(function () {
            var _this = $(this), _isFather = _this.hasClass(finished ? "tr" : "trm"), _point = 0, _weight = 0, _result = 0;
            if (_isFather) {
                _point = finished ? _this.find("td:eq(4)").html() : _this.find("td:eq(4) input").val();
                if (_point && _point != "-") {
                    _weight = finished ? _this.find("td:eq(6)").html() : _this.find("td:eq(6) input").val();
                    _result = _point * _weight / 100;
                } else {
                    _result = 0;
                }
            }
            else if (!_this.attr("id")) {
                _point = finished ? _this.find("td:eq(3)").html() : _this.find("td:eq(3) input").val();
                _weight = finished ? _this.find("td:eq(5)").html() : _this.find("td:eq(5) input").val();
                _result = _point * _weight / 100;
            }
            if (_result) {
                total += _result;
            }
        });
        console.log("Score：" + total);
        $("#weightSum td:eq(0)").html('合计：' + '<span style="color:red;font-size:26px">' + total + '</span>');
    } catch (e) {
        console.error("unknown error");
    };
};

_dom.on("keyup", ".tgao", function () {
    KPI_Action(finished);
});

KPI_Action(finished);


