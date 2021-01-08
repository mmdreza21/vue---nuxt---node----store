module.exports = function (model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endtIndex = page * limit;


    const result = {};
    result.page = page
    result.lent = parseInt(await model.countDocuments().exec() / limit + 1)
    if (endtIndex < (await model.countDocuments().exec())) {
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

    try {
      result.result = await model.find().limit(limit).skip(startIndex).exec();
      res.pagingresult = result;
      next();
    } catch (error) {
      res.status(500).send(error);
    }
  };
};
