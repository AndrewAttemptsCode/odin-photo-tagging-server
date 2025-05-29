const asyncHandler = require("express-async-handler");
const prisma = require("../../config/prismaClient");

const createEntry = asyncHandler(async (req, res) => {
  const { username, score } = req.body;
  const user = await prisma.leaderboard.create({
    data: {
      username: username || "Guest",
      score,
    },
  });

  return res.json(user);
});

const getRankedPlayers = asyncHandler(async (req, res) => {
  const players = await prisma.leaderboard.findMany({
    orderBy: {
      score: "asc",
    },
    take: 10,
  });

  return res.json(players);
});

module.exports = { createEntry, getRankedPlayers };
