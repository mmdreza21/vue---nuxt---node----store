const Joi = require("joi");
const mongoose = require("mongoose");
const { itemschema } = require('../model/items');
const { userschema } = require('../model/user');



const Orderschema = new mongoose.Schema({
    itemId: { type: itemschema, required: true },

    userId: {
        type: new mongoose.Schema({
            fname: { type: String, required: true, maxlength: 50, minlength: 3 },
            lname: { type: String, required: true, maxlength: 50, minlength: 3 },
            phone: { type: String, required: true },
            email: { type: String, required: true, },
            address: { type: String, required: true }
        }), required: true
    },
    num: { type: Number, required: true, default: 1 }

})

const Order = mongoose.model("ord", Orderschema)

function validator(order) {
    const schema = Joi.object({
        itemId: Joi.objectId().required(),
        userId: Joi.objectId().required(),
        num: Joi.number()
    })
    return schema.validate(order)
}

exports.Orderschema = Orderschema
exports.Order = Order
exports.validate = validator