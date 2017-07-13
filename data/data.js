const AnimalsData = require('./animals.data');
const UsersData = require('./users.data');

const init = (db) => {
    return Promise.resolve({
        animals: new AnimalsData(db),
        users: new UsersData(db),
    });
};

module.exports = { init };
