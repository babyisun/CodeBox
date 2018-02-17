//同以目录下的文件更名：
var fs = require('fs');
var data = require("./data.js");
//console.log(data.math.code);


var renameList = function (data, key, dir) {
    if (data && data.data && data.data.list) {
        var output = [];
        for (var i = 0; i < data.data.list.length; i++) {
            var temp = data.data.list[i], ptitle = temp.title;
            //if (temp && temp.title.indexOf(key) >= 0) {
            for (var j = 0; j < temp.list.length; j++) {
                var t = temp.list[j];
                if (t) {
                    var kv = {};
                    if (t.title) {
                        kv.t = "[" + ptitle + "]" + t.title;
                    }
                    if (t && t.video) {
                        var path = t.video.highWatchUrl.split("\/"),
                            filename = path[path.length - 1];
                        //console.log(path.length);
                        kv.v = filename;
                    }
                    output.push(kv);
                }
            }
            //}
        }

        console.log(output);
        return;

        if (output.length) {
            for (var i = 0; i < output.length; i++) {
                var temp = output[i];
                fs.rename(dir + temp.v, dir + temp.t + ".mp4", function (err) {
                    if (err) {
                        console.log(temp);
                        throw err;
                    }
                });
            }
        }
        //console.log(output);
    }
}

renameList(data.math, "2014年1月", "./");

