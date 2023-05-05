//Dung mongoose
const mongoose = require('mongoose');

//Ket noi mongoose
mongoose.connect('mongodb://127.0.0.1:27017/reviewbooks');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BookSchema = new Schema({
  title: {type: String, required: true},
  img: {type: String, required: true},
  desc: {type: String},
  content: {type: String},
  idAuth: {type: ObjectId},
},
  {
    timestamps: true,
  }
);

const BooksModel = mongoose.model('books', BookSchema);

module.exports = BooksModel;