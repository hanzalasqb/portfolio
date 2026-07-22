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

// GET all messages
router.get("/", (req, res) => {
  const db = readDb();
  res.json(db.messages);
});

// POST a new message
router.post("/", (req, res) => {
  const db = readDb();
  const newMessage = { id: db.messages.length > 0 ? Math.max(...db.messages.map(msg => msg.id)) + 1 : 1, ...req.body, timestamp: new Date() };
  db.messages.push(newMessage);
  writeDb(db);
  res.status(201).json(newMessage);
});

// DELETE a message by ID
router.delete("/:id", (req, res) => {
  const db = readDb();
  const id = parseInt(req.params.id);
  const initialLength = db.messages.length;
  db.messages = db.messages.filter(msg => msg.id !== id);
  if (db.messages.length < initialLength) {
    writeDb(db);
    res.status(204).send();
  } else {
    res.status(404).send("Message not found");
  }
});

module.exports = router;
