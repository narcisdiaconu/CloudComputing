const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);
const BookSchema = Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    // publishingData: Date,
    author: { type: Schema.Types.Number, ref: 'Author' }
});

BookSchema.plugin(autoIncrement.plugin, 'Book');

module.exports = mongoose.model('Book', BookSchema);