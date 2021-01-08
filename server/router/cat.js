const express = require("express");
const paging = require("../middleware/paging");
const { Cat, validate } = require("../model/cat");
const router = express.Router();

router.get("/", paging(Cat), async (req, res) => {
  res.send(res.pagingresult);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  let cat = await Cat.findOne({ name: req.body.name });
  if (cat) return res.status(400).send("این دسته بندی موجود است!")

  try {
    cat = await new Cat({ name: req.body.name });
    cat.save();
    res.send(cat);



  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

router.delete("/:id", async (req, res) => {
  const cat = await Cat.findByIdAndRemove(req.params.id);
  if (!cat) return res.status(400).send("no category like that");
  res.send(cat);
});

module.exports = router;
