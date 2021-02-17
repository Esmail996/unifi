const router = require("express").Router();
const controller = require("./controller");

// /post Router

router.post("/create", controller.create);

router.patch("/:id", controller.update);

router.delete("/:id", controller.delete);

router.get("/", controller.getAll);

module.exports = router;