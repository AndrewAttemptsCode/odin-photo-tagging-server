const request = require("supertest");
const app = require("../src/app");

describe("Guess attempts", () => {
  test("Correct item and correct coords", async () => {
    const response = await 
      request(app)
      .post("/guess")
      .send({
        name: "ball",
        coordX: 0.67,
        coordY: 0.64,
      });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
  });

  test("Wrong item and correct coords", async () => {
    const response = await 
      request(app)
      .post("/guess")
      .send({
        name: "ballboy",
        coordX: 0.67,
        coordY: 0.64,
      })
      
      expect(response.status).toBe(404);
      expect(response.body.status).toBe("fail");
  });

  test("Wrong coords of item", async () => {
    const response = await 
      request(app)
      .post("/guess")
      .send({
        name: "ball",
        coordX: 0.25,
        coordY: 0.64,
      })
      
      expect(response.status).toBe(404);
      expect(response.body.status).toBe("fail");
  });

  test("Item does not exist", async () => {
    const response = await 
      request(app)
      .post("/guess")
      .send({
        name: "Wally",
        coordX: 0.55,
        coordY: 0.55,
      })
      
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Item does not exist.");
  });
});