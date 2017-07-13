const init = (data) => {
    const controller = {
        getUser(req, res) {
            const userId = parseInt(req.body.userId, 10);
            return data.users.findById(userId)
                .then((user) => {
                    return res.render('users/profile', req.body);
                });
        },
    };

    return controller;
};

module.exports = { init };
