/**
 * Created by Tu on 10/21/2016.
 */
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
  //  stream = browserSync.stream(),
    fileInclude = require('gulp-file-include'),
    del = require('del'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    es = require('event-stream');

//static server + watching html files
gulp.task('serve',['build'], function(){
    browserSync.init({
        server:{
            baseDir: "./app/build",
            index: "index.html"
        }
    });

    //gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch('app/source/**/*.scss', ['sass']);
    gulp.watch(['app/source/**/*.html', 'app/source/**/images/*','app/templates/*.html'], ['build']);

})

gulp.task('build',['clean:build','sass'], function(){
    return es.concat(gulp.src(['./source/**/*','!./source/**/*.scss', '!./source/**/*.html'])
        .pipe(gulp.dest('./app/build')),
        gulp.src(['./app/source/**/*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: './app/templates'
        }))
        .pipe(gulp.dest('./app/build'))
    ).on('end',reload);
})

gulp.task('sass', function(){
    return sass('./app/source/**/*.scss',{sourcemap:true})
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/build'))
        .pipe(reload({stream:true}));

})
//deletes contents of build folder
gulp.task('clean:build', function(){
    return del([
        'app/build/**/*'
    ]);
})
gulp.task('default'),function(){
    console.log('hello world');
}