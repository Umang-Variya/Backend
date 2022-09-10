const jwt = require('jsonwebtoken');
const { CreateSuccessResponse, CreateErrorResponse } = require("../helpers/responseHelper")
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader?.split(" ")[1];
    if (!token) res.status(401).send("Unauthorized Access");
    const tokenSecret = process.env.SECRET_KEY;
    if (tokenSecret && token) {
      jwt.verify(token, tokenSecret, (err, user) => {
        if (err) res.status(403).send("Unauthorized Access!");
        res.locals.token = token;
        next();
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send(CreateSuccessResponse("Something Went Wrong!!"));
  }
};

module.exports = authMiddleware;
