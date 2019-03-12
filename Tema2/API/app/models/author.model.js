const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);
const AuthorSchema = Schema({
    _id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});
AuthorSchema.plugin(autoIncrement.plugin, 'Author');

module.exports = mongoose.model('Author', AuthorSchema);