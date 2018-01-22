var gulp=require("gulp");
var browserSync= require('browser-sync').create();
gulp.task("reload",function(){
    gulp.src("./dist/index.html").pipe(browserSync.reload({"stream":true}));
})
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch("dist/*.html",["reload"]);
});
