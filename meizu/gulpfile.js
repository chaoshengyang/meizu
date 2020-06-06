//编写任务，管理当前的项目。
const gulp = require("gulp");

//拷贝html
const htmlmin = require("gulp-htmlmin");

gulp.task("copy-html", () => {
    return gulp.src("*.html")
    //压缩HTML
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})

//拷贝图片
gulp.task("images", () => {
    return gulp.src("*.{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

//拷贝数据
gulp.task("data", () => {
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"));
})

//js代码
gulp.task("scripts", () => {
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

//处理scss代码  gulp-sass gulp-minify-css gulp-rename
const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");

//如果要压缩和重命名CSS，每一个文件要分配一个任务
gulp.task("scss1", () => {
    return gulp.src("index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

gulp.task("scss2", () => {
    return gulp.src("shoplist.scss")
    //编译插件
    .pipe(scss())
    //生成的文件保存到制定文件夹
    .pipe(gulp.dest("dist/css"))
    //将文件压缩 重命名
    .pipe(minifyCSS())
    .pipe(rename("shoplist.min.css"))
    //再保存到指定文件夹下
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

gulp.task("scss3", () => {
    return gulp.src("shopDesc.scss")
    //编译插件
    .pipe(scss())
    //生成的文件保存到制定文件夹
    .pipe(gulp.dest("dist/css"))
    //将文件压缩 重命名
    .pipe(minifyCSS())
    .pipe(rename("shopDesc.min.css"))
    //再保存到指定文件夹下
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("scss4", () => {
    return gulp.src("shoppingcart.scss")
    //编译插件
    .pipe(scss())
    //生成的文件保存到制定文件夹
    .pipe(gulp.dest("dist/css"))
    //将文件压缩 重命名
    .pipe(minifyCSS())
    .pipe(rename("shoppingcart.min.css"))
    //再保存到指定文件夹下
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("scss5", () => {
    return gulp.src("login.scss")
    //编译插件
    .pipe(scss())
    //生成的文件保存到制定文件夹
    .pipe(gulp.dest("dist/css"))
    //将文件压缩 重命名
    .pipe(minifyCSS())
    .pipe(rename("login.min.css"))
    //再保存到指定文件夹下
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("copy-php", () => {
    return gulp.src("*.php")
    .pipe(gulp.dest("dist/php"))
    .pipe(connect.reload());
})


//编写一个可以执行上述所有文件的任务
gulp.task("build", ["copy-html", "images", "scripts", "data", "scss1","scss2","scss3","scss4","scss5","copy-php"], () => {
    console.log("项目建立成功");
})

//启动监听
gulp.task("watch", () => {
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch("*.{jpg,png}", ["images"]);
    gulp.watch(["*.json", "!package.json"], ['data']);
    gulp.watch(["*.js", "!gulpfile.js"], ['scripts']);
    gulp.watch("index.scss", ['scss1']);
    gulp.watch("shoplist.scss", ['scss2']);
    gulp.watch("shopDesc.scss", ['scss3']);
    gulp.watch("shoppingcart.scss", ['scss4']);
    gulp.watch("login.scss", ['scss5']);
    gulp.watch("*.php", ['copy-php']);
   
})


//启动一个临时服务器  不支持运行php
const connect = require("gulp-connect");
gulp.task("server", () => {
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true
    })
})


//同时启动服务和监听 运行gulp就会运行名字default的任务
gulp.task("default", ["watch", 'server']);