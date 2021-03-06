var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
gulp.task('copy', function () {
    gulp.src("index.html")
        .pipe(gulp.dest('distr'));
    gulp.src("img/**/*")
        .pipe(gulp.dest('distr/img'));
    gulp.src("Scripts/**/*.html")
        .pipe(gulp.dest('distr/Scripts'));
    gulp.src("Scripts/**/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest('distr/Scripts'));
    gulp.src("css/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest('distr/css'));
    gulp.src("Scripts/bundle.js")
        .pipe(gulp.dest('distr/Scripts'));
    gulp.src("css/**/*.ttf")
        .pipe(gulp.dest('distr/css'));
    gulp.src("node_modules/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest('distr/node_modules/bootstrap/dist/css'));
    gulp.src("node_modules/bootstrap/dist/fonts/*.*")
        .pipe(gulp.dest('distr/node_modules/bootstrap/dist/fonts'));
    gulp.src("node_modules/font-awesome/css/font-awesome.min.css")
        .pipe(gulp.dest('distr/node_modules/font-awesome/css'));
    gulp.src("node_modules/font-awesome/fonts/*.*")
        .pipe(gulp.dest('distr/node_modules/font-awesome/fonts/'));
    gulp.src("node_modules/angular/angular.js")
        .pipe(gulp.dest('distr/node_modules/angular'));
    gulp.src("node_modules/angular-animate/angular-animate.min.js")
        .pipe(gulp.dest('distr/node_modules/angular-animate/'));
    gulp.src("node_modules/angular-i18n/angular-locale_ru-kz.js")
        .pipe(gulp.dest('distr/node_modules/angular-i18n'));
    gulp.src("node_modules/lodash/lodash.min.js")
        .pipe(gulp.dest('distr/node_modules/lodash'));
    gulp.src("node_modules/moment/min/moment.min.js")
        .pipe(gulp.dest('distr/node_modules/moment/min/'));
    gulp.src("node_modules/moment/locale/ru.js")
        .pipe(gulp.dest('distr/node_modules/moment/locale'));
    gulp.src("node_modules/moment-timezone/builds/moment-timezone.min.js")
        .pipe(gulp.dest('distr/node_modules/moment-timezone/builds'));
    gulp.src("node_modules/spin.js/spin.js")
        .pipe(gulp.dest('distr/node_modules/spin.js/'));
    gulp.src("node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js")
        .pipe(gulp.dest('distr/node_modules/angular-ui-bootstrap/dist'));
    gulp.src("node_modules/angular-ui-router/release/angular-ui-router.min.js")
        .pipe(gulp.dest('distr/node_modules/angular-ui-router/release'));
    gulp.src("node_modules/css-ripple-effect/dist/ripple.min.css")
        .pipe(gulp.dest('distr/node_modules/css-ripple-effect/dist'));
}
);