const express = require("express");
const { Item, validate } = require("../model/items");
const router = express.Router();
const _ = require("lodash");
const { Cat } = require("../model/cat");
const paging = require("../middleware/paging");
const { result } = require("lodash");

router.get("/all", async (req, res) => {
  const item = await Item.find().sort("_id");

  res.send(item);
});
router.get("/paging", paging(Item), async (req, res) => {
  res.send(res.pagingresult);
});

//////////
router.get("/most", async (req, res) => {
  const item = await Item.find({ numOfSel: { $gt: 5 } }).sort("numOfSel").limit(15)
  if (!item) return res.status(404).send("؛یافت نشد")
  res.send(item)
});

////////
router.get("/newst", async (req, res) => {
  const item = await Item.find().sort({ _id: 1 }).limit(15)
  if (!item) return res.status(404).send("؛یافت نشد")
  res.send(item)
});
/////////////
router.get("/tag/:tag", async (req, res) => {
  const item = await Item.find({ tag: req.params.tag }).sort("name");
  res.send(item);
});
//////////
router.get("/slider", async (req, res) => {
  const item = await Item.find({ tag: "slider" }).sort("name");
  res.send(item);
});
/////////////
router.get("/one/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) res.status(404).send("what?");
  res.send(item);
});
//////////
router.get("/cat", async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const cat = req.query.cat;


  const startIndex = (page - 1) * limit;
  const endtIndex = page * limit;

  const result = {};
  result.page = page
  result.cat = cat
  result.lent = parseInt(await Item.find({ "categoryId.name": req.query.cat }).countDocuments().exec() / limit + 1)
  if (endtIndex < (await Item.countDocuments().exec())) {
    result.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    result.previos = {
      page: page - 1,
      limit: limit,
    };
  }

  result.item = await Item.find({ "categoryId.name": req.query.cat })
    .limit(limit)
    .skip(startIndex)
    .exec();
  res.pagingresult = result;
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cat = await Cat.findById(req.body.categoryId);
  if (!cat) return res.status(400).send("دسته بندی یافت نشد!!!");

  item = await new Item({
    ..._.pick(req.body, [
      "name",
      "isfree",
      "price",
      "numberInStok",
      "about",
      "tag",
      "image",
      "numOfSel"
    ]),
    categoryId: {
      name: cat.name,
      _id: cat._id,
    },
  });
  item.save();
  res.send(item);
});

router.delete("/:id", async (req, res) => {
  const item = await Item.findByIdAndRemove(req.params.id);
  if (!item) return res.status(400).send("no category like that");
  res.send(item);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cat = await Cat.findById(req.body.categoryId);
  if (!cat) return res.status(400).send("دسته بندی اشتباه است!");

  const item = await Item.findByIdAndUpdate(
    req.params.id,
    {
      ..._.pick(req.body, [
        "name",
        "isfree",
        "price",
        "numberInStok",
        "about",
        "tag",
        "image",
      ]),
      categoryId: {
        name: cat.name,
        _id: cat._id,
      },
    },
    { new: true }
  );
  item.save();
  res.send(item);
});

module.exports = router;
