const { date } = require("joi");
const Joi = require("joi");

const mongoose = require("mongoose");
const { catschema } = require("./cat");

const itemschema = new mongoose.Schema({
  id: Number,
  name: { required: true, type: String, maxlength: 50, minlength: 3 },
  isfree: { type: Boolean, default: false },
  price: {
    type: String,
    required: function () {
      return !this.isfree;
    },
  },
  numberInStok: { type: Number, required: true },
  about: { type: String, required: true },
  categoryId: { type: catschema },
  tag: { type: Array, required: true },
  image: { type: String, required: true },
  numOfSel: { type: Number, },
  date: { type: Date, default: Date.now() }
});
const Item = mongoose.model("i", itemschema);

function validator(item) {
  const schema = Joi.object({
    __v: Joi.number(),
    _id: Joi.string(),
    name: Joi.string().required().max(50).min(3),
    about: Joi.string().required(),
    isfree: Joi.boolean(),
    price: Joi.string(),
    numberInStok: Joi.number().required(),
    categoryId: Joi.objectId().required(),
    tag: Joi.array(),
    image: Joi.string().required(),
    numOfSel: Joi.number(),
    date: Joi.date()
  });
  return schema.validate(item);
}

exports.validate = validator;
exports.Item = Item;
exports.itemschema = itemschema;
