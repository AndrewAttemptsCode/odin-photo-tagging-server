const { Router } = require("express");
const controllers = require("../controllers/index");

const router = Router();

router.post("/", controllers.guess.checkGuess);

module.exports = router;
