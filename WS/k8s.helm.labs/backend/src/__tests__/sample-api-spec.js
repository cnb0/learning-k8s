const request = require("supertest");
const server = require("../app");

test("Get all users /api/users", async (done) => {
  return request(server)
    .get("/api/users")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      done();
    })
    .catch((err) => done(err));
});
