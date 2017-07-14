const passport = require('passport');

const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/login', (req, res) => {
        return res.render('users/login');
    });

    app.get('/register', (req, res) => {
        return res.render('users/register');
    });

    app.get('/profile', (req, res, next) => {
        // Uncomment below to work without user
        // if (!req.user) {
        //     return res.redirect('/');
        // }
        return next();
    }, (req, res) => {
            return controller.getUser(req, res);
    });

    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
    }),
        (req, res) => {
            return controller.getUser(req, res);
            //res.redirect('/profile');
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.post('/register', (req, res, next) => {
        // validate registration data
        if (!req.body.username || req.body.username.length < 3) {

        }

        if (!req.body.password || req.body.password.length < 6) { 

        }

        const user = {
            username: req.body.username,
            password: req.body.password,
        };
        return data.users.create(user)
            .then((dbUser) => {
                return req.login(dbUser, (er) => {
                    if (er) {
                        return next(er);
                    }

                    return controller.getUser(req, res);
                    // return res.redirect('/profile');
                });
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/register');
            });
    });
};

module.exports = { attachTo };
