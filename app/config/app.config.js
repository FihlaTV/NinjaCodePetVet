/* globals require */
const express = require('express');
// const bodyParser = require('body-parser');

const configApp = (app) => {
    app.set('view engine', 'pug');

// body parser helps server to understand information from post request
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/libs', express.static('./node_modules'));
    app.use('/static', express.static('./static'));
};

module.exports = configApp;
