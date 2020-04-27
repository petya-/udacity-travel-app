const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const savedTrips = [];

router.get("/", function (req, res, next) {
  res.sendFile("/client/views/index.html", { root: __dirname + "/.." });
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

module.exports = router;
