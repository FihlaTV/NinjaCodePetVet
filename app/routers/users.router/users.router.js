const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/login', (req, res) => {
        // auth
        return res.render('users/login');
    });

    app.get('/register', (req, res) => {
        return res.render('users/register');
    });

    app.get('/profile', (req, res) => {
        return controller.getUser(req, res);
    });

    app.post('/login', (req, res) => {
        const user = req.body;

        // validate item
        return data.users(user)
            .then((dbUser) => {
                return res.redirect('/');
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err);
                return res.redirect('/register');
            });
    });

    app.post('/register', (req, res) => {
        const user = req.body;

        // validate registration data
        return data.users.create(user)
            .then((dbUser) => {
                return res.redirect('/');
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/register');
            });
    });
};

module.exports = { attachTo };
