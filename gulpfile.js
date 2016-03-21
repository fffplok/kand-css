'use strict';

var gulp        = require('gulp'),
	browserSync = require('browser-sync'),
	sass        = require('gulp-sass'),

	reload      = browserSync.reload,

	src = {
		css: './src/scss/*.scss',
		html: './src/index.html',
		proxy: 'localhost/kand-css/dist'
	},

	dest = {
		css: './dist/css',
		html: './dist'
	};

function logError(err) {
	console.log(err);
	this.emit('end');
}

gulp.task('html', function(){
	gulp.src(src.html)
		.pipe(gulp.dest(dest.html))
		.pipe(reload({stream: true}));
});
	
gulp.task('sass', function () {
  gulp.src(src.css)
    .pipe(sass({outputStyle: 'compressed'}).on('error', logError)) //sass.logError))
    .pipe(gulp.dest(dest.css))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['html','sass'], function() {
    // proxy server
    browserSync.init({
        proxy: src.proxy
    });

  gulp.watch(src.html, ['html']);
  gulp.watch(src.css, ['sass']);
});

gulp.task('default', ['serve']);
