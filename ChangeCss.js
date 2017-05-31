//三种同理方式，触发css变动
document.getElementsByTagName("link")[0].setAttribute("href","a")
document.getElementsByTagName("link")[0].href="a"
$("link").attr("href","a")
//js