const { Router } = require('express');
const passport = require('passport');

const attach = (app) => {
    const router = new Router();

    router
        .get('/auth/sign-in', (req, res) => {
            return res.render('auth/sign-in');
        })
        .post('/login',
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/sign-in',
                failureFlash: true,
            })
        );

    app.use('/auth', router);
};

module.exports = attach;
