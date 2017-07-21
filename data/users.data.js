const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const ObjectID = require('mongodb').ObjectID;

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

    create(model) {
        const username = model.username.toLowerCase();
        return this.collection
            .findOne({ username })
            .then((user) => {
                if (!user) {
                    return super.create(model);
                }
                throw new Error('USERNAME ALREADY EXISTS!');
            });
    }


    findByUsername(username) {
        const usernameToLower = username.toLowerCase();
        return this.collection.findOne({ username: usernameToLower });
    }

    findById(userId) {
        const user = this.collection.findOne({
            _id: new ObjectID(userId),
        });

        return Promise.resolve(user);
    }

    updateUser(model) {
        // if (!this._isModelValid(model)) {
        //     return Promise.reject('Invalid model!');
        // }

        this.collection.updateOne(
            { _id: new ObjectID(model._id) },
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
