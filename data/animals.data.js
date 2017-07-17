const BaseData = require('./base/base.data');
const Animal = require('../models/animal.model');
const objectId = require('mongodb').ObjectID;

class AnimalsData extends BaseData {
    constructor(db) {
        super(db, Animal, Animal);
    }

    getAnimalsByUserId(model) {
        let result = this.collection
            .find({ _id: objectId(model._id) })
            .toArray();

        if (this.ModelClass.toViewModel) {
            result = result.then((models) => {
                return models
                    .map((obj) =>
                        this.ModelClass.toViewModel(obj));
            });
        }
        return result;
    }

    updateAnimal(model) {
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
}

module.exports = AnimalsData;
