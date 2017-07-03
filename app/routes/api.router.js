const { Router } = require('express');

const attach = (app) => {
    const router = new Router();

    router.get('/notFound', (req, res) => {
        res.render('notFound', {
            // here we get html elements
        });
    });

    app.use('/', router);
};

module.exports = attach;
