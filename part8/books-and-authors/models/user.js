const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteGenre: {
    type: Number,
  },
})
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)

const tokenSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true
  }
})
tokenSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Token', tokenSchema)