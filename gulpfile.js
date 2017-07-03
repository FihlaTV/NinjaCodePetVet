const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

/*eslint-disable*/
const port = process.env.PORT || 3001;
/*eslint-enable*/

gulp.task('server', () => {
    const app = require('./app');

    const date = new Date();
    const result = `App works on port ${port} at 
    ${date.getHours()}:${date.getMinutes()}h!`;

    app.listen(port, () => console.log(result));
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server'],
    });
});

// gulp.task('test-server:start', () => {
//     const connectionString = 'mongodb://nameOfTheBase';
// });
