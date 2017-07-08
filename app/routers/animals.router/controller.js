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
    };

    return controller;
};


module.exports = { init };
