const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

/*eslint-disable*/
const port = process.env.PORT || 3001;
/*eslint-enable*/

gulp.task('server', () => {
    const app = require('./app');
    app.listen(port, () => console.log(`App works on port ${port}!`));
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        script: './app',
    });
});

// gulp.task('test-server:start', () => {
//     const connectionString = 'mongodb://localhost/PetVetDb';
// });
