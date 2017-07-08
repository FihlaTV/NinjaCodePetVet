const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const config = require('./config/app.config');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('server', () => {
    return Promise.resolve()
        .then(() => require('./db').init(config.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            app.listen(
                config.port,
                () => console.log(`App works on port: ${config.port}`));
        });
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        script: './app',
    });
});

/*
gulp.task('pre-test', () => {
    return gulp.src([
        './data/!**!/!*.js',
        './app/!**!/!*.js',
        './config/!**!/!*.js',
        './db/!**!/!*.js',
        './models/!**!/!*.js',
        './server.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
        './test/unit/!**!/!*.js',
        './test/integration/!**!/!*.js',
    ])
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports());
});

gulp.task('tests:browser', ['server-start'], () => {
    return gulp.src('./test/browser/items/create-item.js')
        .pipe(mocha({
            reporter: 'nyan',
            timeout: 10000,
        }))
        .once('end', () => {
            gulp.start('server-stop');
        });
});
*/
