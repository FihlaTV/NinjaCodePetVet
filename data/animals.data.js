const BaseData = require('./base/base.data');
const Animal = require('../models/animal.model');

class AnimalsData extends BaseData {
    constructor(db) {
        super(db, Animal, Animal);
    }

    _isModelValid(model) {
        return super._isModelValid(model);
    }
}

module.exports = AnimalsData;
