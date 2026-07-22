const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "database", "db.json");

// Helper function to read the database
const readDb = () => {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
};

// Helper function to write to the database
const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
};

// GET hero data
router.get("/", (req, res) => {
  const db = readDb();
  res.json(db.hero);
});

// PUT (update) hero data
router.put("/", (req, res) => {
  const db = readDb();
  db.hero = { ...db.hero, ...req.body };
  writeDb(db);
  res.json(db.hero);
});

module.exports = router;
