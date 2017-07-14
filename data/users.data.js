const BaseData = require('./base/base.data');
const User = require('../models/user.model');

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
}

module.exports = UsersData;
