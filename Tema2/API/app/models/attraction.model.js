const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);
const AttractionSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    description: String,
    address: String,
    city: { type: Schema.Types.Number, ref: 'City' }
}, { versionKey: false });

AttractionSchema.plugin(autoIncrement.plugin, 'Attraction');

module.exports = mongoose.model('Attraction', AttractionSchema);