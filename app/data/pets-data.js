const { MongoClient } = require('mongodb');

const connectionString = 'mongodb://localhost/PetVetDb';
const connectionPromise = MongoClient.connect(connectionString);

connectionPromise.then((db) => {
    return db;
}).then((db) => {
    db.collection('Pets').insertOne({
        owner: 'Ivan',
        name: 'Lucky',
        address: 'Mladost 3, block 323',
        type: 'dog',
        breed: 'Husky',
        age: '3',
        checkUp: '23.06.2017',
    })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = connectionPromise;
