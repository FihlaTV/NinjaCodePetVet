const init = (data) => {
    const controller = {
        getUser(req, res) {
        console.log('=========== REQ IN USER CONTROLLER ======');
        console.log(req.user);
            // const userId = parseInt(req.body.userId, 10);
            return data.users.findById(req.user.userId)
                .then((user) => {
                    return res.render('users/profile', user);
                });
        },
    };

    return controller;
};

module.exports = { init };
