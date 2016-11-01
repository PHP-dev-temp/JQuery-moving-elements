var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),	
	cleanCSS = require('gulp-clean-css'),
	compass = require('gulp-compass');
	
var env, 
	jsSources, 
	sassSources, 
	htmlSources, 
	outputDir;
	
env = process.env.NODE_ENV || 'development'; //NODE_ENV=production gulp
	
if (env === 'development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}
	
jsSources = [
	'components/scripts/start.js',
	'components/scripts/moving.js',
	'components/scripts/resizing.js',
	'components/scripts/script.js'
];
sassSources = ['components/sass/wt.scss'];
htmlSources = [outputDir + '*.html'];

gulp.task('concat', function() {
  gulp.src(jsSources)
	.pipe(concat('wt.js'))
    .pipe(gulpif(env === 'production', uglify()))
	.pipe(gulp.dest(outputDir + 'js'))
	.pipe(connect.reload());
});
 
gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      css: outputDir + 'css',
      sass: 'components/sass',
      image: outputDir + 'images'
    })
    .on('error', gutil.log))
    .pipe(gulpif(env === 'production', cleanCSS()))
    .pipe(gulp.dest(outputDir + 'css'))
	.pipe(connect.reload());
});

gulp.task('default', ['concat', 'compass', 'html', 'php', 'connect', 'watch']);

gulp.task('watch', function(){
	gulp.watch(jsSources, ['concat']);
	gulp.watch('components/sass/**/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['html']);
});

gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('html', function(){
  gulp.src('builds/development/*.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
	.pipe(connect.reload());
});

gulp.task('php', function(){
  gulp.src('builds/development/*.php')
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
	.pipe(connect.reload());
});