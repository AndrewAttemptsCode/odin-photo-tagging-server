const request = require("supertest");
const app = require("../src/app");
const prisma = require("../config/prismaClient");

const entries = [
        { username: "test1", score: 9 },
        { username: "test2", score: 67 },
        { username: "test3", score: 87 },
        { username: "test4", score: 44 },
        { username: "test5", score: 55 },
        { username: "test6", score: 24 },
        { username: "test7", score: 56 },
        { username: "test8", score: 2 },
        { username: "test9", score: 33 },
        { username: "test10", score: 11 },
        { username: "test11", score: 16 },
        { username: "test12", score: 13 },
        { username: "test13", score: 31 },
        { username: "test14", score: 23 },
        { username: "test15", score: 17 },
      ];

beforeEach(async () => {
  await prisma.leaderboard.deleteMany();
})

describe("Leaderboard routes", () => {
  test("Has no entries when leaderboard is empty", async () => {
    const response = await 
      request(app)
      .get("/leaderboard")
      
      expect(response.body.length).toBe(0)
  })

  test("Returns a maximum of 10 results", async () => {
    for (const entry of entries) {
      await request(app).post("/leaderboard")
      .send(entry)
    }
      
      const response = await 
        request(app)
        .get("/leaderboard")
        expect(response.body.length).toBe(10)
  })

  test("Quickest score is in position 1", async () => {
    for (const entry of entries) {
      await request(app)
      .post("/leaderboard")
      .send(entry)
    }

    const response = await
    request(app)
    .get("/leaderboard")
    expect(response.body[0].score).toBe(2)
  })

  test("No name provided, displays as Guest", async () => {
    await request(app)
    .post("/leaderboard")
    .send({ username: "", score: 2 })

    const response = await request(app)
    .get("/leaderboard")
    expect(response.body[0].username).toBe("Guest")
  })
})