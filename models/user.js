const config = require("config");
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");
const userSchema = new mongoose.Schema({
       email: {
              type: String,
              minlength: 5,
              maxlength: 255,
              required: true,
              unique: true
       },
       password: {
              type: String,
              minlength: 5,
              maxlength: 1024,
              required: true
       },
       username: {
              type: String,
              minlength: 5,
              maxlength: 255,
              required: true
       },
       isAdmin: {
              type: Boolean,
              default: false
       },
       posts: [
              {type: new mongoose.Schema({
                     title: {
                            type: String,
                            minlength: 5,
                            maxlength: 255,
                            required: true
                     },
                     slug: {
                            type: String,
                            minlength: 5,
                            maxlength: 255,
                            required: true
                     },
                     text: {
                            type: String,
                            minlength: 5,
                            maxlength: 1024,
                            required: true
                     }
              })
       }]
})
userSchema.methods.generateToken = function() {
       return jwt.sign({id: this._id, admin: this.isAdmin, email: this.email}, config.get("privateKey"));
}
const User = mongoose.model('users',userSchema );
function validateUser(user) {
       return Joi.object({
              email: Joi.string().min(5).max(255).required(),
              password: Joi.string().min(5).max(1024).required(),
              username: Joi.string().min(5).max(1024).required(),
       }).validate(user)
}


exports.User = User
exports.validateUser = validateUser