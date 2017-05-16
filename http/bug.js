var http=require("http");
var cheerio=require("cheerio");
var url ="http://www.imooc.com/learn/348";

function filterChapters(html){
	var $= cheerio.load(html);
	var chapters=$(".chapter");
	var array=[];
	chapters.each(function(){
		var _this=$(this);
		var _title=_this.find("strong").text();
		array.push(_title);
	});
	console.log(array);
}

http
.get(url,function(res){
	var html="";

	res.on("data",function(data){
		html+=data;
	});
	res.on("end",function(){
		filterChapters(html);
	});
}).on("error",function(e){
	console.log(e);
});
