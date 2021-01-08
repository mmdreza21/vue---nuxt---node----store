const Joi = require("joi");

const mongoose = require("mongoose");

const catschema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    maxlength: 50,
    minlength: 5,
  },
});
const Cat = mongoose.model("category", catschema);

function validator(cat) {
  const schema = Joi.object({
    name: Joi.string().required().max(50).min(5),
  });
  return schema.validate(cat);
}

exports.validate = validator;
exports.Cat = Cat;
exports.catschema = catschema;
