/**
 * Created by North on 16/3/22.
 * Last modified by north on 16/3/26
 */
'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    concat = require('gulp-concat'), //组合文件
    rename = require("gulp-rename"), //命名工具
    sass = require('gulp-sass'), //编译sass
    sourcemaps = require('gulp-sourcemaps'), //sourcemaps指向
    importCss = require('gulp-import-css'), // css文件导入
    minifyCss = require('gulp-minify-css'), // css文件压缩
//autoprefixer = require('gulp-autoprefixer'),// css美化，多浏览器兼容
    minifyImg = require('gulp-imagemin'), // img文件压缩
    minifyHTML = require('gulp-minify-html'), //html压缩
    uglify = require('gulp-uglify'), // js压缩
    clean = require('gulp-clean'), // 清空文件夹
    replace = require('gulp-replace'), // 字符替换
    webpack = require('webpack'), // webpack
    named = require('vinyl-named'), // 配合webpack的命名插件
    rev = require('gulp-rev'), // 更改版本名
    revCollector = require('gulp-rev-collector'), // 更新静态资源引用路径
    runSequence = require('gulp-run-sequence'), // 按队列执行任务
    _config = require('./config'),
    _webpack_config = require('./webpack.config'),
    _webpack_config_min = require('./webpack.min.config'),
    stripDebug = require('gulp-strip-debug'),
    yuidoc = require("gulp-yuidoc");
//babel = require("gulp-babel"),
//through2 = require("through2");

//通配符
var character = "**/*.*";
var sourcemap = "**/*.map";
var jsAndcss = "**/*.{js,css}";
var project = "LmsMAppUI";
//开发版路径
var src = {};
src.root = "src/" + _config.Current + "/";
src.js = src.root + "js/**/*.{js,jsx}";
src.pagejs = src.root + "js/page/*.js";
src.css = src.root + "css/**/*.css";
src.sass = src.root + "css/**/*.scss";
src.font = src.root + "css/font/**/*.*";
src.img = src.root + "images/**/*.{png,jpg,gif,ico}";
src.html = src.root + "page/**/*.html";
//编译版路径
var dev = {};
dev.root = "dev/" + _config.Current + "/";
dev.js = dev.root + "js/";
dev.pagejs = dev.root + "js/page/";
dev.css = dev.root + "css/";
dev.font = dev.root + "css/font/";
dev.img = dev.root + "images/";
dev.html = dev.root + "page/";
//发布版路径
var build = {};
build.root = "build/" + _config.Current + "/";
build.js = build.root + "js/";
build.pagejs = build.root + "js/page/";
build.css = build.root + "css/";
build.font = build.root + "css/font/";
build.img = build.root + "images/";
build.html = build.root + "page/";
build.moveToServer = "../../lms25/dma_ucenter/lms025/" + project + "/" + _config.Current + "/";
build.server = "../../dma_static_release/" + project + "/build/" + _config.Current + "/";


var webpack_config = {
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-1', 'react']
            }
        }]
    }
};
//压缩配置
var uglify_config = {
    mangle: {
        except: ['define', 'require', 'module', 'exports']
    }
    //, compress: false
};
//sass包含路径
var sassIncludePaths = {includePaths: [require("bourbon").includePaths]};

//生成技术文档
gulp.task("yuidoc", function () {
    gulp.src(src.root + "js/**/*.jsx")
        .pipe(yuidoc.parser())
        .pipe(yuidoc.reporter())
        .pipe(yuidoc.generator())
        .pipe(gulp.dest("./doc"));
    console.log("文档生成成功");
});


//构建js
gulp.task('js', function () {
    //gulp.src([src.js, '!./**/*.min.js'])
    console.log("脚本构建中...");
    gulp.src([src.js, '!' + src.pagejs,
        "!" + src.root + "js/lib/lib.js",
        "!" + src.root + "js/normal/**/*.js"])
        .pipe(gulp.dest(dev.js))
        //.pipe(uglify(uglify_config))
        .pipe(gulp.dest(build.js));

    webpack(_webpack_config, function (err, stats) {
        if (err) {
            console.log(err);
        }
        console.log("dev构建完毕");
    });
    webpack(_webpack_config_min, function (err, stats) {
        if (err) {
            console.log(err);
        }
        console.log("build构建完毕");
    });

    gulp.src(src.root + "js/normal/**/*.js")
        .pipe(gulp.dest(dev.js + "normal/"))
        .pipe(uglify(uglify_config))
        .pipe(gulp.dest(build.js + "normal/"));

    console.log("脚本压缩构建完毕");
});


//构建css
gulp.task('css', function () {
    console.log("样式构建中...");
    //sass
    gulp.src(src.sass)
        .pipe(sass(sassIncludePaths))
        .pipe(importCss())
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(dev.css))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(build.css));
    //普通css
    gulp.src(src.css)
        .pipe(importCss())
        //.pipe(autoprefixer({browsers: ['> 1%']}))
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(dev.css))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(build.css));
    //移动字体图标
    gulp.src(src.font)
        .pipe(gulp.dest(dev.font))
        .pipe(gulp.dest(build.font));
    console.log("样式构建完毕");
});

//构建image
gulp.task('img', function () {
    console.log("图片优化中...");
    gulp.src(src.img).pipe(minifyImg({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
        .pipe(gulp.dest(dev.img))
        .pipe(gulp.dest(build.img));
    console.log("图片构建完毕");
});

//清理
gulp.task('clean', function () {
    gulp.src(
        [
            dev.root + character,
            build.root + character,
            "!" + dev.root + "**/lib.js",
            "!" + build.root + "**/{lib.js,lib.js.map}"
        ], {
            read: false
        }).pipe(clean({
        force: true
    }));
    console.log("清理完成");
});

// 打版本号并生成rev-manifest.json文件
gulp.task('rev', function () {
    console.log("版本号生成中...");
    gulp.src([dev.root + jsAndcss, "!" + src.root + "html/" + character, "!" + src.sass])
        .pipe(rev()).pipe(rev.manifest(_config.Current + "-rev-manifest.json")).pipe(gulp.dest('rev/'));
    console.log("版本号已生成");
});

// 修改html文件，给静态文件打戳
gulp.task('html', ['rev'], function () {
    console.log("更新时间戳进行中...");
    gulp.src(['rev/' + _config.Current + '/*.json', dev.css])
        .pipe(revCollector({
            replaceReved: true
        }))
        // 修改为 ?v=stamp 形式
        .pipe(replace(/\-([0-9a-z]{8,})\.(png|jpg|gif|ico)/g, function (a, b, c) {
            return '.' + c + '?v=' + b;
        }))
        .pipe(gulp.dest(dev.html))
        .pipe(replace("/dev/", "/build/"))
        .pipe(gulp.dest(build.css));
    console.log("css时间戳更新完毕");
    gulp.src(['rev/' + _config.Current + '/*.json', src.html])
        .pipe(revCollector({
            replaceReved: true
        }))
        // 修改为 ?v=stamp 形式
        .pipe(replace(/\-([0-9a-z]{8,})\.((min\.)?css|(min\.)?js)/g, function (a, b, c) {
            return '.' + c + '?v=' + b;
        }))
        .pipe(gulp.dest(dev.html))
        .pipe(replace("/dev/", "/build/"))
        // .pipe(minifyHTML({
        //     empty: true,
        //     spare: true,
        //     cdata: true
        // }))
        .pipe(gulp.dest(build.html))
        .pipe(gulp.dest(build.moveToServer))
        .pipe(replace("static.dmas.cig.com.cn", "static.dma.cig.com.cn"))
        .pipe(gulp.dest(build.moveToServer + "online/"));

    gulp.src(src.root + "html/**/*.html")
        .pipe(gulp.dest(dev.root + "html/"))
        .pipe(gulp.dest(build.root + "html/"));

    console.log("html时间戳更新完毕");
});

gulp.task("removeCon", function () {
    gulp.src([dev.pagejs + character, "!" + dev.pagejs + sourcemap])
        .pipe(stripDebug())
        .pipe(uglify(uglify_config))
        .pipe(gulp.dest(build.server + "js/page/"));
    console.log("已经更新到Git下的build目录,合并代码后请登录Jenkins进行构建");
});
gulp.task("totest", function () {
    gulp.src([build.root + character, "!" + build.pagejs + character, "!" + build.root + sourcemap, "!" + build.root + "**/*.jsx"])
        .pipe(gulp.dest(build.server));
    console.log("正在发布...");
});
//发布到测试机
gulp.task('test', function (def) {
    return runSequence('totest', 'removeCon', def);
});

// 发布
gulp.task('release', function (def) {
    return runSequence('js', 'css', 'img', 'rev', 'html', def);
});

//时间格式化函数
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 监控文件，自动处理
gulp.task('watch', function () {
    //_webpack_config.watch = true;
    _webpack_config_min.watch = true;
    //console.log(_webpack_config);
    //性能优化：监听的时候不编译dev版本，只有release时编译
    // webpack(_webpack_config, function (err) {
    //     if (err) {
    //         console.log("------dev------");
    //         console.log(err);
    //     }
    //     console.log("dev构建完毕");
    //     console.log("------" + new Date().Format("yyyy-MM-dd hh:mm:ss") + "------");
    // });
    webpack(_webpack_config_min, function (err) {
        if (err) {
            console.log("------bulid------");
            console.log(err);
        }
        console.log("bulid构建完毕");
        console.log("------" + new Date().Format("yyyy-MM-dd hh:mm:ss") + "------");
    });

    gulp.watch([src.css, src.sass, src.root + "{html,page}/*.html"], function (e) {
        var src_path = e.path,
            dev_path = src_path.replace(/\\src\\/g, "/dev/"),
            build_path = src_path.replace(/\\src\\/g, "/build/"),
            _dev_path = dev_path.substr(0, dev_path.lastIndexOf("\\")),
            _build_path = build_path.substr(0, build_path.lastIndexOf("\\"));
        //console.log(src_path.indexOf("\\page\\"));
        console.log('文件：' + src_path + "被修改");
        if (src_path.indexOf(".scss") > -1) {
            console.log("SCSS文件正在生成...");
            if (src_path.indexOf("component") > -1 || src_path.indexOf("\\page\\") > -1) {
                src_path = src.sass;//[src.root + "css/core/**/*.scss", src.root + "css/page/**/*.scss"];
                _dev_path = dev.css;
                _build_path = build.css;
                console.log("关联SCSS文件正在生成...");
            }
            gulp.src(src_path)
                .pipe(sass(sassIncludePaths))
                .pipe(importCss())
                .pipe(sourcemaps.init())
                .pipe(gulp.dest(_dev_path))
                .pipe(minifyCss())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(_build_path));

        } else if (src_path.indexOf(".css") > -1) {
            console.log("CSS文件正在生成...");
            //普通css
            gulp.src(src_path)
                .pipe(importCss())
                .pipe(sourcemaps.init())
                .pipe(gulp.dest(_dev_path))
                .pipe(minifyCss())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(_build_path));
        } else if (src_path.indexOf(".html") > -1) {
            console.log("html文件正在生成...");
            gulp.src(src_path)
                .pipe(gulp.dest(_dev_path))
                .pipe(gulp.dest(_build_path));
        }

        console.log("修改后的文件已经生成");
        console.log("------" + new Date().Format("yyyy-MM-dd hh:mm:ss") + "------");
    });

    console.log("开始监控css、js、html变化");
});

// 默认任务
gulp.task('default', ['watch']);