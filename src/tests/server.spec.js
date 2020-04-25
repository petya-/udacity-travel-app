const app = require("../server/server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

describe("Test API endpoints", () => {
  test("GET / -> Successfuly render index.html", async () => {
    const response = await request.get("/").expect(200);
  });
});
