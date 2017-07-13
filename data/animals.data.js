const BaseData = require('./base/base.data');
const Animal = require('../models/animal.model');
const objectId = require('mongodb').ObjectID;

class AnimalsData extends BaseData {
    constructor(db) {
        super(db, Animal, Animal);
    }

    _isModelValid(model) {
        return super._isModelValid(model);
    }

    updateAnimal(model) {
        // if (!this._isModelValid(model)) {
        //     return Promise.reject('Invalid model!');
        // }

        this.collection.updateOne(
            { _id: objectId(model._id) },
            {
                $set: {
                    ownerAddress: model.ownerAddress,
                    ownerPhone: model.ownerPhone,
                    checkUp: model.checkUp,
                },
            }).catch((err) => {
            return err;
        });
    }

    // _isModelValid(model) {
    //     return this.validator.isValid(model);
    // }
}

module.exports = AnimalsData;
