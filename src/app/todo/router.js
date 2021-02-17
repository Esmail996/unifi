const router = require("express").Router();
const controller = require("./controller");
const auth = require("../../authorization");

// /post Router

router.post("/create", controller.create);

router.patch("/:id", auth, controller.update);

router.delete("/:id", auth, controller.delete);

router.get("/:id", auth, controller.getById);

router.get("/", auth, controller.getAll);

module.exports = router;
