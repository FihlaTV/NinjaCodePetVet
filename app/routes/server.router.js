const { Router } = require('express');

const attach = (app) => {
    const router = new Router();

    router.get('/notFound', (req, res) => {
        res.render('notFound', {});
    }).get('/', (req, res) => {
        res.render('home', {});
    }).get('/createAnimal', (req, res) => {
        res.render('createAnimal', {});
    }).post('/', (req, res) => {
        const animal = req.body;
            });

    app.use('/', router);
};

module.exports = attach;
