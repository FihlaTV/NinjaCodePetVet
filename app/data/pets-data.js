const { MongoClient } = require('mongodb');

const connectionString = 'mongodb://localhost/PetVetDb';
const dbConnection = MongoClient.connect(connectionString);

dbConnection
    .then((connection) => {
        connection.collection('Pets').insertOne({
            name: 'Lucky',
            type: 'dog',
            breed: 'Husky',
            age: '3',
            checkUp: '23.06.2017',
        });
    })
    .catch((error) => {
        console.log(error);
    });
