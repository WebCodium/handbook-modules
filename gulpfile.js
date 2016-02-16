var gulp = require('gulp');
var jshint = require('gulp-jshint');
var minifyHtml = require('gulp-minify-html');
var templateCache = require('gulp-angular-templatecache');
var browserSync = require('browser-sync');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var Q = require('q');
var reload = browserSync.reload;
var del = require('del');
var fs = require('fs');
var path = require('path');

gulp.task('default', ['lint-js', 'scripts', 'templates']);

gulp.task('lint-js', function () {
    gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function (done) {
    gulp.src([
        'src/app.module.js',
        'src/**/*.module.js',
        'src/**/*.js'
    ])
        .pipe(wrap('(function() {\n\'use strict\';\n\n<%= contents %>\n\n})();'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});
gulp.task('docs', shell.task([
    'node_modules/jsdoc/jsdoc.js '+
    '-c node_modules/angular-jsdoc/common/conf.json '+   // config file
    '-t node_modules/angular-jsdoc/angular-template '+   // template file
    '-d docs '+                           // output directory
    './README.md ' +                            // to include README.md as index contents
    '-r src/**/*.js '                 // source code directory
    //'-u tutorials'                              // tutorials directory
]));
var modulesDir = './src/';
var getModules = function (dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
};

function templatesGenerate() {
    var modules = getModules(modulesDir);
    var i = 0;
    var deferred = Q.defer();

    modules.map(function (folder) {
        gulp.src(modulesDir + folder + '/*.html')
            .pipe(minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
            .pipe(templateCache('app.' + folder + '.template.js', {
                module: 'app.' + folder + '.template',
                standalone: true
            }))
            .pipe(gulp.dest('dist/templates'));
        i++;
    });
    var interval = setInterval(function () {
        if (i === modules.length) {
            clearInterval(interval);
            deferred.resolve();
        }
    }, 50);
    return deferred.promise;
};
function templatesConcat() {
    var deferred = Q.defer();
    gulp.src('dist/templates/*')
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist'))
        .on('end', deferred.resolve);
    return deferred.promise;
};
function templatesClean() {
    del.sync(['dist/templates'], {force: true});
}

gulp.task('templates', function () {
    templatesGenerate()
        .then(templatesConcat)
        .then(templatesClean);
});

gulp.task('clean', function () {
    del.sync(['dist/*'], {force: true});
});

gulp.task('serve', function () {
    browserSync({
        notify: false,
        port: 1337,
        server: {
            baseDir: '.',
            index: 'index.html',
            routes: {
                '/bower_components': 'bower_components',
                '/dist': 'dist'
            }
        }
    });

    gulp.watch([
        'dist/**/*',
        'index.html'
    ]).on('change', reload);

    gulp.watch([
        'gulpfile.js',
        'src/**/*.js'
    ], ['scripts']);

    gulp.watch([
        'src/**/*.html'
    ], ['templates']);
});