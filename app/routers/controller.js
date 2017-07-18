const init = (data) => {
    const controller = {
        getUser(req) {
            const userId = parseInt(req.body.userId, 10);
            return data.users.findById(userId)
                .then((user) => {
                    // user.isAnonymous = false;

                    if (Object.keys(user).length > 0) {
                        user.isAnonymous = false;
                    }

                    return Promise.resolve(user);
                });
        },
    };

    return controller;
};

module.exports = { init };
