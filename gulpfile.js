var gulp         = require('gulp'),
		sass         = require('gulp-sass'), // Sass компілятор в css
		sourcemaps   = require('gulp-sourcemaps'),
		concat       = require('gulp-concat'), // З'єднує (конкатенує) файли
		autoprefixer = require('autoprefixer'), // PostCss autoprefixer - автоматично формує вендорні префікси
		cssmin       = require('gulp-cssmin'), // Мініфікація css
		rename       = require('gulp-rename'), // Перейменування файлу
		postcss      = require('gulp-postcss'), // PostCss
		mqpacker     = require('css-mqpacker'), // Збирає всі медіа-запити в одному місці
		imagemin     = require('gulp-imagemin'),
		svgstore     = require('gulp-svgstore'),
		svgmin       = require('gulp-svgmin'),
		del          = require('del'), // Видаляє папки, файли
		run          = require('run-sequence'), // Запускає послідовно задачі
		plumber      = require('gulp-plumber'), // Відслідковування і вивід в консоль помилок
		notify       = require("gulp-notify"), // Вивід повідомлення про помилку
		cheerio      = require('gulp-cheerio'),
		browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		browserSync  = require('browser-sync').create(); // Сервер

// Static server
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		// tunnel: 'sedona',
		notify: false
	});
});


gulp.task('styles', function() {
	return gulp.src('app/sass/style.sass')
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'nested'}).on('error', notify.onError()))
	.pipe(sourcemaps.write())
	.pipe(postcss([
			autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}),
			mqpacker({
				// sort: true
			})
		]))
	.pipe(gulp.dest('app/css'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('js', function() {
	return gulp.src('app/js/common.js')
	.pipe(plumber())
	// .pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/js/'));
});

gulp.task('script', function() {
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/jquery-popup-overlay/jquery.popupoverlay.js',
			'app/libs/jquery-mask-plugin/dist/jquery.mask.min.js',
			'app/libs/jquery-validation/dist/jquery.validate.min.js',
			'app/libs/swiper/dist/js/swiper.min.js',
			'app/libs/fancybox/dist/jquery.fancybox.min.js',
			'app/libs/swiper/dist/js/swiper.min.js',
			'app/libs/isotope-layout/dist/isotope.pkgd.min.js',
			'app/libs/matchHeight/dist/jquery.matchHeight-min.js',
			// 'app/libs/fullpage.js/dist/jquery.fullpage.min.js',
			// 'app/libs/jScrollPane/script/jquery.mousewheel.js',
			// 'app/libs/jScrollPane/script/jquery.jscrollpane.min.js',
			// 'app/libs/air-datepicker/dist/js/datepicker.min.js',
			// 'app/libs/jt.timepicker/jquery.timepicker.min.js',
		])
	.pipe(concat('script.js'))
	// .pipe(uglify())
	.pipe(gulp.dest('app/js/'));
});

gulp.task('browserify', function() {
	return browserify('app/js/scripts.js')
		.bundle()
		// Передаем имя файла, который получим на выходе, vinyl-source-stream
		.pipe(source('scripts.min.js'))
		.pipe(gulp.dest('app/js'));
});

gulp.task('symbols', function() {
	return gulp.src('app/img/icon/*.svg')
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(cheerio({
			run: function($) {
				$('[fill]').removeAttr('fill');
				$('[style]').removeAttr('style');
				$('[class]').removeAttr('class');
				$('title').remove();
				$('defs').remove();
				$('style').remove();
				$('svg').attr('style', 'display:none');
			}
		}))
		.pipe(rename('symbols.html'))
		.pipe(gulp.dest('app/img'));
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', ['styles']);
	gulp.watch('app/*.html').on("change", browserSync.reload);
	gulp.watch('app/js/common.js').on("change", browserSync.reload);
});


/* Project transfer to production */
gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('images', function() {
	return gulp.src('app/img/**/*.{png,jpg,gif,ico}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true})
		]))
		.pipe(gulp.dest('dist/img'))
});

gulp.task('svg', function() {
	return gulp.src('app/img/*.svg')
		.pipe(svgmin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'styles', 'images', 'svg'], function(){
	gulp.src(['app/css/style.min.css'])
		.pipe(gulp.dest('dist/css'));

	gulp.src(['app/fonts/**/*'])
		.pipe(gulp.dest('dist/fonts'));

	gulp.src(['app/js/**/*'])
		.pipe(gulp.dest('dist/js'));

	gulp.src(['app/img/symbols.html'])
		.pipe(gulp.dest('dist/img'));

	gulp.src(['app/*.html'])
		.pipe(gulp.dest('dist'));
});


gulp.task('default', ['styles', 'js', 'script', 'browser-sync', 'watch']);