const init = (data) => {
    const controller = {
        getUser(req) {
            console.log('=========== USER IN CONTROLLER ======');
            console.log(req.body);
            // const userId = parseInt(req.body.userId, 10);
            if (req.user) {
                return data.users.findById(req.user.userId)
                .then((user) => {
                    user.isAnonymous = true;

                    if (Object.keys(user).length > 0) {
                        user.isAnonymous = false;
                    }

                    return Promise.resolve(user);
                });
            }

            return Promise.resolve({});
        },
    };
    return controller;
};

module.exports = { init };
