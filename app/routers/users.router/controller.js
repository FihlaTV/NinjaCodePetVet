const init = (data) => {
    const controller = {
        getUser(req, res) {
            const userId = req.body.userId;
            return data.users.findById(userId)
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
