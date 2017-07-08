const AnimalsData = require('./animals.data');

const init = (db) => {
    return Promise.resolve({
        animals: new AnimalsData(db),
    });
};

module.exports = { init };
