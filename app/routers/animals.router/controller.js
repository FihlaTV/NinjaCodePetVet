const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.animals.getAll()
                .then((animals) => {
                    return res.render('animals/allAnimals', {
                        context: animals,
                    });
                });
        },
        getAnimalsByUserId(req, res) {
            return data.animals.getAnimalsByUserId(req.body)
                .then((animals) => {
                    return res.render('user/profile', {
                        context: animals,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
