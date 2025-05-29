const { Router } = require("express");
const controllers = require("../controllers/index");

const router = Router();

router.get("/", controllers.leaderboard.getRankedPlayers);

router.post("/", controllers.leaderboard.createEntry);

module.exports = router;
