const router = require("express").Router();
const controller = require("./controller.js");

// /user Router

router.post("/signup", controller.create);

module.exports = router;
