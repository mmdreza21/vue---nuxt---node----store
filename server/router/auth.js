const express = require("express");
const Joi = require("joi");
const { user, User } = require("../model/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("ایمیل یا کلمه ی عبور نا معتبر است!");

  const authPassword = await bcrypt.compare(req.body.password, user.password);
  if (!authPassword)
    return res.status(401).send("ایمیل یا کلمه ی عبور نا معتبر است!");

  const token = user.gen();
  res.send({
    token,
    fullname: user.fname + " " + user.lname,
  });
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

router.get("/user", auth, async (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
    // console.log(req.body);
  } else {
    res.status(401).send();
  }
});
module.exports = router;
