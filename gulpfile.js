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

gulp.task('docs:base', shell.task([
    'node_modules/jsdoc/jsdoc.js ' +
    '-c node_modules/angular-jsdoc/common/conf.json ' +   // config file
    '-t node_modules/angular-jsdoc/angular-template ' +   // template file
    '-d docs ' +                           // output directory
    './README.md ' +                            // to include README.md as index contents
    '-r src/**/*.js '                 // source code directory
    //'-u tutorials'                              // tutorials directory
]));

gulp.task('docs', ['docs:base'], function () {
    return gulp.src(modulesDir + '**/*.html', {base: modulesDir})
        .pipe(wrapper({
            header: '<html><head>' +
            '<link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css"/>' +
            '<script src="/bower_components/codemirror/lib/codemirror.js"></script>' +
            '<script src="/bower_components/codemirror/mode/xml/xml.js"></script>' +
            '<script src="/bower_components/codemirror/mode/css/css.js"></script>' +
            '<script src="/bower_components/codemirror/mode/javascript/javascript.js"></script>' +
            '<script src="/bower_components/codemirror/mode/htmlmixed/htmlmixed.js"></script>' +
            '<link rel="stylesheet" href="/bower_components/codemirror/lib/codemirror.css">' +
            '<script src="/bower_components/angular/angular.js"></script>' +
            '<script src="/dist/app.js"></script><script src="/dist/templates.js"></script>' +
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
                    '<div ng-app="demo" ng-cloak>' +
                    '<div id="frameResultExample" style="display: none;">' +
                    '<h2>Result example</h2>' +
                    '<div id="exampleResult">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<h2>Template</h2>' +
                    '<div id="code"></div>' +
                    '<script>angular.module(\'demo\', [\'handbook\']);</script>' +
                    '<script type="text/javascript">' +
                    'var editor = CodeMirror(document.getElementById("code"), {lineNumbers: true,mode: "text/html",readOnly:true,value: document.getElementById(\'html\').innerHTML.replace(new RegExp("<!--(?:.*\\\\s){0,}-->", "g"), "").trim()});' +
                    'var matches = (new RegExp("<!--((?:.*\\\\s){0,})-->", "g")).exec(document.getElementById(\'html\').innerHTML);' +
                    'if (matches && matches[1]){' +
                    'document.getElementById(\'frameExample\').style.display=\'block\';' +
                    'document.getElementById(\'frameResultExample\').style.display=\'block\';' +
                    'document.getElementById(\'exampleResult\').innerHTML = matches[1];' +
                    'var editor2 = CodeMirror(document.getElementById("example"), {lineNumbers: true,mode: "text/html",readOnly:true,value: matches[1].trim()});' +
                    '}' +
                    '</script>' +
                    '</body></html>'
            }
        }))
        .pipe(rename(function (path) {
            path.dirname = "";
        }))
        .pipe(gulp.dest('docs/templates'));
});

gulp.task('watch:docs', ['docs'], function () {
    gulp.watch([
        'gulpfile.js',
        'src/**/*.html'
    ], ['docs']);
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