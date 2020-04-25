const router = require("express").Router();

router.get("/", function (req, res, next) {
  res.sendFile("/client/views/index.html", { root: __dirname + "/.." });
});

module.exports = router;
