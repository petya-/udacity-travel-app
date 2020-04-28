const app = require("../server/server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
let trip = {
  city: "test",
  country: "test country",
};
describe("Test API endpoints", () => {
  test("GET / -> Successfuly render index.html", async () => {
    const response = await request.get("/").expect(200);
  });

  test("POST /trips -> Successfuly create a trip", async () => {
    const response = await request
      .post("/trips")
      .send({ trip })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    trip.id = response.body[0].id;

    expect(response.body[0].city).toBe(trip.city);
    expect(response.body[0].country).toBe(trip.country);
    expect(response.body[0].id).toBeTruthy();
  });

  test("GET /trips -> Successfuly get trips", async () => {
    const response = await request.get("/trips").expect(200);
    expect(response.body.length).toBe(1);
  });

  test("Delete /trips -> Successfuly delete a trip", async () => {
    const response = await request
      .delete(`/trips/${trip.id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.length).toBe(0);
  });
});
