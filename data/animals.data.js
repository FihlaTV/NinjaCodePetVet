const BaseData = require('./base/base.data');
const Animal = require('../models/animal.model');
const ObjectID = require('mongodb').ObjectID;

class AnimalsData extends BaseData {
    constructor(db) {
        super(db, Animal, Animal);
    }

    getAnimalsByOwnerUsername(model) {
        let result = this.collection
            .find({ 'owner': model.username })
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
            { _id: new ObjectID(model._id) },
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
