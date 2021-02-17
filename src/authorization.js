const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // get the authorization header from request
    const authorizationHeader =
      req.headers["Authorization"] || req.headers["authorization"];
    const token = authorizationHeader.split(" ")[1];

    const payload = verify(token, "secret");

    const { user } = payload;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};
