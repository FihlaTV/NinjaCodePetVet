const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const objectId = require('mongodb').ObjectID;

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    checkPassword(username, password) {
        return this.collection.findOne({
            username,
        })
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user!');
                }
                if (user.password !== password) {
                    throw new Error('Invalid password!');
                }
                return true;
            });
    }

    findByUsername(username) {
        const usernameToLower = username.toLowerCase();
        const user = this.collection.find({ 'username': usernameToLower });
        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No such user');
            }
            console.log('=========== USER IN FIND BY USERNAME ======');
            console.log(user);
            return resolve(user);
        });
    }

    findById(userId) {
        userId = parseInt(userId, 10);

        const user = this.collection.find( { '_id': userId });
        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No such user');
            }
            return resolve(user);
        });
    }

    updateUser(model) {
        // if (!this._isModelValid(model)) {
        //     return Promise.reject('Invalid model!');
        // }

        this.collection.updateOne(
            { _id: objectId(model._id) },
            {
                $set: {
                    address: model.address,
                    phone: model.phone,
                    password: model.password,
                },
            }).catch((err) => {
            return err;
        });
    }
}

module.exports = UsersData;
