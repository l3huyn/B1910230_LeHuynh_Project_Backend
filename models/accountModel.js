//Dung mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
//Ket noi mongoose
mongoose.connect('mongodb://127.0.0.1:27017/reviewbooks');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccountSchema = new Schema({
  username: {type: String, required: true, unique: true, min: 6, max: 24},
  password: {type: String, required: true, min: 8, max: 16}
},
  {
    timestamps: true,
  }
);

AccountSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
      .then(hash => {
          this.password = hash
          next()
      })
      .catch(error => {
          console.log(`Error in hashing password: ${error.message}`);
          next(error);
      });
})

const AccountModel = mongoose.model('account', AccountSchema);

module.exports = AccountModel;