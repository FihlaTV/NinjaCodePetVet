class BaseData {
    constructor(db, ModelClass, validator) {
        // TODO: create validator!
        this.validator = validator;
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        const filter = {};
        const options = {};
        let result = this.collection
            .find(filter, options)
            .toArray();

        if (this.ModelClass.toViewModel) {
            result = result.then((models) => {
                return models
                    .map((model) =>
                        this.ModelClass.toViewModel(model));
            });
        }
        return result;
    }

    update(model) {
        // if (!this._isModelValid(model)) {
        //     return Promise.reject('Invalid model!');
        // }
        this.collection.findOneAndUpdate(
            { _id: model._id },
            {
                $set: {
                    ownerAddress: model.ownerAddress,
                    ownerPhone: model.ownerPhone,
                    checkUp: model.checkUp,
                },
            },
            // { upsert: true } --> generates new object
            // if can't find it in the base
            { upsert: true }).catch((err) => {
            return err;
        });
    }

    //
    // _isModelValid(model) {
    //     return this.validator.isValid(model);
    // }

    create(model) {
        // if (!this._isModelValid(model)) {
        //     return Promise.reject('Invalid model!');
        // }

        return this.collection.insertOne(model)
            .then(() => {
                return this.ModelClass.toViewModel(model);
            });
    }

    // _isModelValid(model) {
    //     return this.validator.isValid(model);
    // }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;
