const { MongoClient } = require('mongodb');

const connectionString = 'mongodb://localhost/PetVetDb';
const dbConnection = MongoClient.connect(connectionString);