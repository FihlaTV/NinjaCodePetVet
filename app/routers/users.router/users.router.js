const passport = require('passport');

const attachTo = (app, data) => {
    const controller = require('./users.controller').init(data);
    const animalsController =
        require('../animals.router/controller').init(data);

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

    app.put('/profile', (req, res, next) => {
        // Uncomment below to work without user
        // if (!req.user) {
        //     return res.redirect('/login');
        // }
        return next();
    }, (req, res) => {
        const user = req.body;
        // validate item
        return data.users.updateUser(user);
    });

    app.get('/profile', (req, res, next) => {
        // Uncomment below to work without user
        // if (!req.user) {
        //     return res.redirect('/login');
        // }
        return next();
    }, (req, res) => {
        return controller.getUser(req, res);
    });

    app.get('/profile', (req, res, next) => {
        // Uncomment below to work without user
        // if (!req.user) {
        //     return res.redirect('/login');
        // }
        return next();
    }, (req, res) => {
        return animalsController.getAnimalsByUserId(req, res);
    });

    app.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/login',
        }),
        (req, res) => {
            req.user.isAnonymous = false;
            res.render('users/profile', {
                context: {
                    user: req.user,
                },
            });
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
                    return controller.getUser(req, res);
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
