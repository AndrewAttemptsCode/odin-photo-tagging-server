const prisma = require("./prismaClient");

const main = async () => {
  console.log("Deleting existing items...");
  await prisma.item.deleteMany({});

  console.log("Seeding items...")
  await prisma.item.createMany({
    data: [
      {
        name: "ball",
        coordX: 0.67,
        coordY: 0.64,
        deviation: 0.02,
      },
      {
        name: "sludge",
        coordX: 0.34,
        coordY: 0.9,
        deviation: 0.03,
      },
      {
        name: "ballboy",
        coordX: 0.35,
        coordY: 0.49,
        deviation: 0.045,
      },
      {
        name: "inflatable",
        coordX: 0.6,
        coordY: 0.88,
        deviation: 0.045,
      },
    ],
  });

  console.log("Seeding complete.")
};

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
  })    
  .finally(() => {
    console.log("Disconnecting from the database...");
    prisma.$disconnect();
  }); 
