/* globals __dirname */

const path = require('path');
const fs = require('fs');

const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/', (req, res) => {
        controller.getUser(req)
            .then((user) => {
                console.log('======== USER');
                console.log(user);
                return res.render('home', { context: user });
            });
    });

    app.get('/aboutUs', (req, res) => {
        return res.render('aboutUs');
    });

    app.get('/contactUs', (req, res) => {
        return res.render('contactUs');
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });

    app.get('*', (req, res) => {
        return res.render('notFound');
    });
};

module.exports = { attachTo };
