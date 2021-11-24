const express = require("express");
const router = express.Router();
const models = require("../models");
const auth = require("../middleware/tokenAuth");

// The `http://localhost:3001/` endpoint

router.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
