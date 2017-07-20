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
            return data.animals.getAnimalsByOwnerUsername(req.body);
        },
    };

    return controller;
};


module.exports = { init };
