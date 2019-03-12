const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);
const CitySchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    country: String,
    latitude: Number,
    longitude: Number,
    attractions: [{ type: Number, ref: 'Attraction' }]
}, { versionKey: false });
CitySchema.plugin(autoIncrement.plugin, 'City');

module.exports = mongoose.model('City', CitySchema);