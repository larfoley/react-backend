var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true }
})

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.passwordHash, function(err, res) {
    cb(err, res)
  })
}

var User = mongoose.model('User', UserSchema);


module.exports = User
