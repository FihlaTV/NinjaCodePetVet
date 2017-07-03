const { Router } = require('express');

const attach = (app) => {
    const router = new Router();

    router.get('/', (req, res) => {
        res.render('home', {
            // here we get html elements
        });
    }).get('/test', (req, res) => {
        res.render('test', {
            // here we get html elements
        });
    }).get('/notFound', (req, res) => {
        res.render('notFound', {
            // here we get html elements
        });
    });

    app.use('/', router);
};

module.exports = attach;
