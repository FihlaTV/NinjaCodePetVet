const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const messages = require('express-messages');

const init = (data) => {
    const app = express();

    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/libs', express.static('./node_modules'));
    app.use('/static', express.static('./static'));
    app.use(cookieParser('keyboard cat'));
    app.use(flash());

    app.use((req, res, next) => {
        res.locals.messages = messages(req, res);
        next();
    });

    require('../config/auth.config').init(app, data);
    // delete below middleware
    app.use((req, res, next) => {
        console.log('-- Current user --');
        console.log(req.user);
        next();
    });

    require('./routers')
        .attachTo(app, data);

    return Promise.resolve(app, data);
};

module.exports = {
    init,
};
