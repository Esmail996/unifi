const router = require("express").Router();

router.use("/user", require("./user/router"));

router.use("/todo", require("./todo/router"));

module.exports = router;
