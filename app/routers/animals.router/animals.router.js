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

    app.get('/createAnimal', (req, res) => {
        return res.render('animals/createAnimal');
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
        const animal = req.body;

        // validate item
        return data.animals.create(animal)
            .then((dbAnimal) => {
                return res.redirect('/profile');
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err);
                return res.redirect('/createAnimal');
            });
    });
};

module.exports = { attachTo };
