const init = (data) => {
    const controller = {
        getUser(req, res) {
            return data.users.getUser()
                .then((user) => {
                    return res.render('users/profile', {
                        context: user,
                    });
                });
        },
    };

    return controller;
};

module.exports = { init };
