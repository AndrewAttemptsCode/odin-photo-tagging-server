const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Leaderboard route");
});

module.exports = router;
