const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Guess route");
});

module.exports = router;
