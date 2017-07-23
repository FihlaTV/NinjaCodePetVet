const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const config = require('./config/app.config');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const { MongoClient } = require('mongodb');

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

// Tests
const testConfig = {
    connectionString: 'mongodb://localhost/PetVetDb-test',
    port: 3002,
};

gulp.task('test-server:start', () => {
    return Promise.resolve()
        .then(() => require('./db').init(testConfig.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            app.listen(
                config.port,
                () => console.log(`Magic happends at :${config.port}`));
        });
});

gulp.task('test-server:stop', () => {
    return MongoClient.connect(testConfig.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

gulp.task('pre-test', () => {
    return gulp.src([
        './data/**/*.js',
        './app/**/*.js',
        './config/**/*.js',
        './db/**/*.js',
        './models/**/*.js',
        './server.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
        './tests/unit/**/*.js',
        './tests/integration/**/*.js',
    ])
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports());
});

gulp.task('tests:browser', ['test-server-start'], () => {
    return gulp.src('./tests/browser/items/create-item.js')
        .pipe(mocha({
            reporter: 'nyan',
            timeout: 10000,
        }))
        .once('end', () => {
            gulp.start('test-server-stop');
        });
});

