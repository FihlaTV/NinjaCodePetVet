const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app.get('/allAnimals', (req, res) => {
        // auth
        return controller.getAll(req, res);
    });

    app.get('/createAnimal', (req, res) => {
        return res.render('animals/createAnimal');
    });

    app.put('/animals', (req, res) => {
        const animal = req.body;
        // validate item
        return data.animals.updateAnimal(animal);
    });

    app.post('/animals', (req, res) => {
        const animal = req.body;

        // validate item
        return data.animals.create(animal)
            .then((dbAnimal) => {
                return res.redirect('/allAnimals');
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err);
                return res.redirect('/createAnimal');
            });
    });
};

module.exports = { attachTo };
