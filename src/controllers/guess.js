const prisma = require("../../config/prismaClient");
const asyncHandler = require("express-async-handler");

const checkGuess = asyncHandler(async (req, res) => {
  const { name, coordX, coordY } = req.body;

  const item = await prisma.item.findUnique({
    where: { name },
  });

  if (!item) {
    return res.status(404).json({ message: "Item does not exist." });
  }

  if (
    Math.abs(coordX - item.coordX) < item.deviation &&
    Math.abs(coordY - item.coordY) < item.deviation
  ) {
    return res.json({ status: "success", message: `You got the ${item.name}` });
  } else {
    return res.status(404).json({ status: "fail", message: `${item.name} not found` });
  }
});

module.exports = { checkGuess };
