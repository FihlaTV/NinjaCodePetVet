const passport = require('passport');

const attachTo = (app, data) => {
    const usersController = require('./users.controller').init(data);

    app.get('/login', (req, res) => {
        const context = {
            user: {
                isAnonymous: true,
            },
        };
        return res.render('users/login', { context: context });
    });

    app.get('/register', (req, res) => {
        return res.render('users/register');
    });

    app.get('/profile', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        return next();
        }, (req, res) => {
            return usersController.getUser(req, res);
    });

    app.put('/profile', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        return next();
        }, (req, res) => {
            const user = req.body;
            return data.users.updateUser(user);
    });

    app.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/login',
        }),
        (req, res) => {
            res.redirect('\profile');
        }
    );

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.post('/register', (req, res, next) => {
        // validate registration data
        if (!req.body.username || req.body.username.length < 3) {
            req.flash('info', 'Username must be at least 3 characters long!');
            res.redirect('/register');
        }

        if (!req.body.password || req.body.password.length < 6) {
            req.flash('info', 'Password must be at least 6 characters long!');
            res.redirect('/register');
        }

        const user = req.body;
        return data.users.create(user)
            .then((dbUser) => {
                return req.login(dbUser, (er) => {
                    if (er) {
                        return next(er);
                    }
                    return usersController.getUser(req, res);
                });
            })
            .catch(() => {
                req.flash('info', 'Username already exists! ' +
                    'Please try another one :)');
                res.redirect('/register');
            });
    });
};

module.exports = { attachTo };
