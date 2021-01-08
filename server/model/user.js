const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userschema = new mongoose.Schema({
  fname: { type: String, required: true, maxlength: 50, minlength: 3 },
  lname: { type: String, maxlength: 50, minlength: 3 },
  phone: { type: String, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  address: { type: String, },
});
userschema.methods.gen = function () {
  const token = jwt.sign(
    {
      fullname: this.fname,
      _id: this.id,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWt
  );
  return token;
};

const User = mongoose.model("user", userschema);

const complexityOptions = {
  min: 6,
  max: 30,
  lowerCase: 1,
  numeric: 1,
  upperCase: 1,
  symbol: 1,
  requirementCount: 2,
};

function validator(user) {
  const schema = Joi.object({
    fname: Joi.string().required().max(50).min(3),
    lname: Joi.string().max(50).min(3),
    phone: Joi.string(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions).required(),
    isAdmin: Joi.boolean(),
    address: Joi.string(),
  });
  return schema.validate(user);
}

exports.validate = validator;
exports.User = User;
exports.userschema = userschema