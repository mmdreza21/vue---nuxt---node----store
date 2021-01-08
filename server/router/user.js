const express = require("express");
const { validate, User } = require("../model/user");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  res.send("secuurety");
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).send("user ID not found")

  res.send({
    ..._.pick(user, [
      "fname",
      "lname",
      "phone",
      "email",
      "address",
    ])
  })

});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("کاربری با ایمیل وارد شده وجود دارد!");

  user = await new User(
    _.pick(req.body, [
      "fname",
      "lname",
      "phone",
      "email",
      "password",
      "isAdmin",
      "address",
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.gen();
  await user.save();
  res
    .header("x-auth", token)

    .send(_.pick(user, ["_id", "fname", "lname", "phone", "email", "address"]));
});

router.put("/:id", async (req, res) => {

  const user = await User.findByIdAndUpdate(req.params.id, {
    ..._.pick(req.body,
      [
        "fname",
        "lname",
        "phone",
        "address"
      ])
  }, { new: true })


  res.send(user)

});

module.exports = router;
