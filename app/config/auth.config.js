/* globals User */

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const MongoStore = require('connect-mongo')(session);

const configAuth = (app) => {
    MongoClient.connect('mongodb://localhost/PetVetDb')
        .then((db) => {
            passport.use(new Strategy(
                (username, password, done) => {
                    User.findOne({ username: username }, (err, user) => {
                        if (err) {
                            return done(err);
                        }
                        if (!user) {
                            return done(null, false,
                                { message: 'Incorrect username!' });
                        }
                        if (!user.validPassword(password)) {
                            return done(null, false,
                                { message: 'Incorrect password!' });
                        }
                        return done(null, user);
                    });
                }
            ));

            app.use(cookieParser());
            app.use(session({ secret: 'Pet Vet' }));
            app.use(passport.initialize());
            app.use(passport.session());

            passport.serializeUser((user, done) => {
                done(null, user.id);
            });

            passport.deserializeUser((id, done) => {
                User.findById(id, function(err, user) {
                    done(err, user);
                });
            });
        });
};

module.exports = configAuth;
