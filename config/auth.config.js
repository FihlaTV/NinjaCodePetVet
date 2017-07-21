/* globals User */

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const mongoDb = require('mongodb').MongoClient;
const MongoStore = require('connect-mongo')(session);
const config = require('./app.config');
const passportConfig = require('./passport.config');

const init = (app, data) => {
    app.use(cookieParser());
    app.use(session({
        store: new MongoStore({
            url: config.connectionString,
            autoRemove: 'native', // Default
        }),
        secret: 'Pet Vet',
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passportConfig(app, data);
};

module.exports = { init };
