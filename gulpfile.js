var gulp = require('gulp');
var jshint = require('gulp-jshint');
var minifyHtml = require('gulp-minify-html');
var templateCache = require('gulp-angular-templatecache');
var browserSync = require('browser-sync');
var wrap = require('gulp-wrap');
var wrapper = require('gulp-wrapper');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var rename = require('gulp-rename');
//var ghPages = require('gulp-gh-pages');
var Q = require('q');
var reload = browserSync.reload;
var del = require('del');
var fs = require('fs');
var path = require('path');

var base = 'app/';

gulp.task('default', ['lint-js', 'scripts', 'templates']);

gulp.task('lint-js', function () {
    gulp.src(base + 'src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function (done) {
    gulp.src([
        base + 'src/app.module.js',
        base + 'src/**/*.module.js',
        base + 'src/**/*.js'
    ])
        .pipe(wrap('(function() {\n\'use strict\';\n\n<%= contents %>\n\n})();'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(base + 'dist'))
        .on('end', done);
});

var modulesDir = base + 'src/';
var getModules = function (dir) {
    var deferred = Q.defer();
    fs.readdir(dir, function (err, dirs) {
        if (err) throw err;
        deferred.resolve(dirs.filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        }));
    });
    return deferred.promise;
};

function templatesGenerate(modules) {
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
            .pipe(gulp.dest(base + 'dist/templates'))
            .on('end', function () {
                i++;
                if (i === modules.length) {
                    deferred.resolve();
                }
            });
    });
    return deferred.promise;
};
function templatesConcat() {
    var deferred = Q.defer();
    gulp.src(base + 'dist/templates/*')
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(base + 'dist'))
        .on('end', deferred.resolve);
    return deferred.promise;
};
function templatesClean() {
    del.sync([base + 'dist/templates'], {force: true});
}

gulp.task('templates', function () {
    getModules(modulesDir)
        .then(templatesGenerate)
        .then(templatesConcat)
        .then(templatesClean);
});

gulp.task('clean', function () {
    del.sync([base + 'dist/*'], {force: true});
});

gulp.task('docs:base', shell.task([
    'node_modules/jsdoc/jsdoc.js ' +
    '-c node_modules/angular-jsdoc/common/conf.json ' +   // config file
    '-t ' + base + 'vendor/jsdoc-angular-template ' +   // template file
    '-d ' + base + 'docs ' +                           // output directory
    './README.md ' +                            // to include README.md as index contents
    '-r ' + base + 'src/**/*.js'                 // source code directory
//'-u tutorials'                              // tutorials directory
]))
;
gulp.task('vendor:docs', function () {
    return gulp.src(require('./' + base + 'vendor-docs.json'))
        .pipe(gulp.dest(base + 'docs/vendor'));
});
gulp.task('docs', ['docs:base', 'vendor:docs'], function () {
    return gulp.src(modulesDir + '**/*.html', {base: modulesDir})
        .pipe(wrapper({
            header: '<html><head>' +
            '<link rel="stylesheet" href="../vendor/bootstrap.min.css"/>' +
            '<script src="../vendor/codemirror.js"></script>' +
            '<script src="../vendor/xml.js"></script>' +
            '<script src="../vendor/css.js"></script>' +
            '<script src="../vendor/javascript.js"></script>' +
            '<script src="../vendor/htmlmixed.js"></script>' +
            '<link rel="stylesheet" href="../vendor/codemirror.css">' +
            '<style>body{padding: 10px;}.CodeMirror {height: auto;}.CodeMirror-scroll{height: auto}</style>' +
            '</head><body>' +
            '<div id="html" style="display: none;">',

            footer: function (file) {
                var example;
                fs.readFile(file.path, "utf-8", function (err, _data) {
                    //do something with your data
                    var matches = /<!--((?:.*\s){0,})-->/.exec(_data);
                    if (matches) {
                        example = matches[1];
                    }
                });
                return '</div>' +
                    '<div id="frameExample" style="display: none;">' +
                    '<h2>Example</h2>' +
                    '<div id="example">' +
                    '</div>' +
                    '</div>' +
                    '<h2>Template</h2>' +
                    '<div id="code"></div>' +
                    '<script type="text/javascript">' +
                    'var editor = CodeMirror(document.getElementById("code"), {lineNumbers: true,mode: "text/html",readOnly:true,value: document.getElementById(\'html\').innerHTML.replace(new RegExp("<!--(?:.*\\\\s){0,}-->", "g"), "").trim()});' +
                    'var matches = (new RegExp("<!--((?:.*\\\\s){0,})-->", "g")).exec(document.getElementById(\'html\').innerHTML);' +
                    'if (matches && matches[1]){' +
                    'document.getElementById(\'frameExample\').style.display=\'block\';' +
                    'var editor2 = CodeMirror(document.getElementById("example"), {lineNumbers: true,mode: "text/html",readOnly:true,value: matches[1].trim()});' +
                    '}' +
                    '</script>' +
                    '</body></html>'
            }
        }))
        .pipe(rename(function (path) {
            path.dirname = "";
        }))
        .pipe(gulp.dest(base + 'docs/templates'));
});

gulp.task('serve:docs', ['docs'], function () {
    browserSync({
        notify: false,
        port: 1337,
        server: {
            baseDir: base + 'docs',
            index: 'index.html',
            routes: {
                '../vendor': base + 'bower_components',
                '/dist': base + 'dist'
            }
        }
    });
    gulp.watch([
        'README.md',
        'gulpfile.js',
        base + 'src/**/*'
    ], ['docs']);
});

gulp.task('serve', function () {
    gulp.watch([
        base + 'dist/**/*',
        'index.html'
    ]).on('change', reload);

    gulp.watch([
        'gulpfile.js',
        base + 'src/**/*.js'
    ], ['scripts']);

    gulp.watch([
        base + 'src/**/*.html'
    ], ['templates']);
});

//gulp.task('deploy', ['docs'], function () {
//    return gulp.src('./docs/**/*')
//        .pipe(ghPages());
//});