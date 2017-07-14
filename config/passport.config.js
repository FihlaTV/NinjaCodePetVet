const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportConfig = (app, data) => {
    console.log('=========== DATA IN PASSPORT CONFIG ======');
    console.log(data.users.findByUsername('vasilv'));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        return data.users.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });

    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
        },
        (username, password, done) => {
            data.users.findByUsername(username)
                .then( (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false,
                            { message: 'Incorrect username!' });
                    }
                    if (!user.checkPassword(password)) {
                        return done(null, false,
                            { message: 'Incorrect password!' });
                    }
                    return done(null, user);
            });
        }
    ));
};

module.exports = passportConfig;
