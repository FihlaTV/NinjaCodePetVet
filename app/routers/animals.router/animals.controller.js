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
        getAnimalsByOwnerUsername(req, res) {
            return data.animals.getAnimalsByOwnerUsername(req.body)
                .then((animals) => {
                    return res.render('users/profile', {
                        context: animals,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
