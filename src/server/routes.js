const router = require("express").Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");

let savedTrips = [];

router.get("/", function (req, res, next) {
  res.sendFile(path.resolve("dist/index.html"));
});

router.get("/trips", function (req, res, next) {
  res.status(200).json(savedTrips);
});

router.post("/trips", function (req, res, next) {
  const { trip } = req.body;
  trip.id = uuidv4();
  savedTrips.push(trip);
  res.status(200).json(savedTrips);
});

router.delete("/trips/:id", function (req, res, next) {
  const { id } = req.params;
  savedTrips = savedTrips.filter((trip) => trip.id !== id);
  res.status(200).json(savedTrips);
});

module.exports = router;
