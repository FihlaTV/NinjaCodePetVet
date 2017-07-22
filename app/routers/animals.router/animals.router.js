const attachTo = (app, data) => {
    const controller = require('./animals.controller').init(data);

    app.get('/allAnimals', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        return next();
    }, (req, res) => {
        return controller.getAll(req, res);
    });

    app.put('/animals', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        return next();
    }, (req, res) => {
        const animal = req.body;
        // validate item
        return data.animals.updateAnimal(animal);
    });

    app.post('/animals', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        return next();
    }, (req, res) => {
        if (!req.body.name || req.body.name.length < 5) {
            req.flash('info', 'Pet name must be at least 5 characters long!');
            return res.redirect('/profile');
        }
        if (!req.body.type || req.body.type.length < 3) {
            req.flash('info', 'Pet kind must be at least 3 characters long!');
            return res.redirect('/profile');
        }
        if (!req.body.breed || req.body.breed.length < 5) {
            req.flash('info', 'Pet breed must be at least 5 characters long!');
            return res.redirect('/profile');
        }
        if (!req.body.birthDate || req.body.birthDate.length < 10) {
            req.flash('info',
                'Pet birth date must be at least 10 characters long!');
            return res.redirect('/profile');
        }
        const animal = req.body;
        // validate item
        return data.animals.create(animal)
            .then((dbAnimal) => {
                return res.redirect('/profile');
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err);
                return res.redirect('/profile');
            });
    });
};

module.exports = { attachTo };
