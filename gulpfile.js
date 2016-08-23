var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename'); 


/* *************
	CSS
************* */

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postcssProcessors = [
	autoprefixer( {
		browsers: 'last 2 versions'
	} )
];
var cleanCSS = require('gulp-clean-css');
var ToastCSSFile = 'src/Toast.css';
gulp.task('css', function() {
	gulp.src(ToastCSSFile)
		.pipe( postcss(postcssProcessors) )
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename('Toast.min.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(gulp.dest('demo/css'));
	gulp.src(ToastCSSFile)
		.pipe( postcss(postcssProcessors) )
		.pipe(gulp.dest('dist/css'));

	gulp.src('src/base.css')
		.pipe( postcss(postcssProcessors) )
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('demo/css'));
});



/* *************
	JS
************* */
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var ToastJSFile = 'src/Toast.js';
gulp.task('js', function() {

	// 	ES 6
	gulp.src(ToastJSFile)
		.pipe(rename('Toast-ES6.js'))
		.pipe(gulp.dest('dist/js'));

	// ES 5
	gulp.src(ToastJSFile)
		.pipe(
			babel({ presets: ['es2015'] })
			.on('error', gutil.log)
		)
		.pipe(uglify())
		.pipe(rename('Toast.min.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(gulp.dest('demo/js'));
	gulp.src(ToastJSFile)
		.pipe(
			babel({ presets: ['es2015'] })
			.on('error', gutil.log)
		)
		.pipe(rename('Toast.js'))
		.pipe(gulp.dest('dist/js'));
});


/* *************
    HTML
************* */
var htmlFile = 'src/index.html';
gulp.task('html', function() {
    gulp.src(htmlFile)
        .pipe(gulp.dest('demo'));
});


/* *************
	SERVER
************* */
var connect = require('gulp-connect');
gulp.task('connect', function() {
	connect.server({
		server: './demo',
		port: 3200
	});
});


/* *************
	WATCH
************* */
gulp.task('watch', function() {
	gulp.watch('src/*.css',['css']);
	gulp.watch('src/*.js',['js']);
	gulp.watch('src/*.html', ['html']);
});



/* *************
	DEFAULT
************* */

gulp.task('default', ['connect', 'css', 'js', 'html', 'watch']);
