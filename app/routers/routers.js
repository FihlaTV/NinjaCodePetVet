/* globals __dirname */

const path = require('path');
const fs = require('fs');

const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        return res.render('home');
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
