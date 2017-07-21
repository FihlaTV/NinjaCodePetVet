const init = (data) => {
    const controller = {
        getUser(req) {
            if (req.user) {
                return data.users.findById(req.user._id)
                    .then((user) => {
                        user.isAnonymous = false;
                        return Promise.resolve(user);
                    });
            }

            return Promise.resolve({
                user: {
                    isAnonymous: true,
                },
            });
        },
    };
    return controller;
};

module.exports = { init };
