const express = require('express');
const app = express();
const data = require('./data');

require('./config/app.config')(app);
// require('./config/auth.config')(app);

require('./routes')(app);

// if no controller is found for this page redirect it
app.get('*', (req, res) => {
    res.redirect('/notFound');
});

module.exports = app;
