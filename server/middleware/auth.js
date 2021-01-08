const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("token provided");

  try {
    const decode = jwt.verify(token.split(" ")[1], process.env.JWT);
    req.user = decode;

    next();
  } catch (error) {
    res.status(401).send("invalid token>>>wtf<<<");
  }
};
