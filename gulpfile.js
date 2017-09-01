var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('InStepSass',function(){
    return gulp.src('./src/sass/*.scss')
                .pipe(sass({outputStyle:'compact'}).on('error', sass.logError))
                .pipe(gulp.dest('./src/css'))
});

gulp.task('jtSass',function(){
    gulp.watch('./src/sass/*.scss',['InStepSass']);
})

var browserSync = require('browser-sync');
gulp.task('server',function(){
    browserSync({
        // 代理服务器
        proxy:'http://localhost/prrProject',

        // 监听文件修改，自动刷新浏览器
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php','./src/js/*.js']
    });

    // 开启服务器的同时，监听sass的修改
    gulp.watch('./src/**/*.scss',['InStepSass']);
})