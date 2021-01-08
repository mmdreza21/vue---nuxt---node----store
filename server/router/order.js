const express = require('express')
const { Item } = require('../model/items')
const { Order, validate } = require('../model/order')
const { User } = require('../model/user')
const _ = require('lodash');
const router = express.Router()
//
const mongoose = require('mongoose');
const Fawn = require('fawn');
Fawn.init(mongoose)
//

router.get('/', async (req, res) => {
    const order = await Order.find().sort("_id")
    res.send(order)
}),
    router.get('/:id', async (req, res) => {
        const order = await Order.find({ "userId._id": req.params.id }).sort("_id")
        if (!order) return res.status(404).send("userId not fund")
        res.send(order)
    })

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findById(req.body.userId)
    if (!user) return res.status(400).send("کاربر یافت نشد!!")
    let item = await Item.findById(req.body.itemId)
    if (!item) return res.status(400).send("محصول شناسایی نشد!!")
    if (item.numberInStok == 0) return res.status(400).send("محصول تمام شده!!")
    const order = new Order({
        userId: { ..._.pick(user, ["_id", "fname", "lname", "phone", "address"]) },
        itemId: { ..._.pick(item, ["_id", "name", "price", "numberInStok", "about", "image",]) },
        num: req.body.num
    })

    num = req.body.num
    await new Fawn.Task()
        .save("ords", order)
        .update("is", { _id: item._id },
            {
                $inc: { numberInStok: - num, numOfSel: + num },

            },
        )
        .run()
    res.send({ order })

})
router.delete('/:id', async (req, res) => {



    const order = await Order.findByIdAndRemove(req.params.id)
    num = order.num
    item = order.itemId
    await new Fawn.Task()
        .update("is", { _id: item._id },
            {
                $inc: { numberInStok: + num, numOfSel: - num },

            },
        )
        .run()
    res.send(order)
})

module.exports = router