const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database', 'db.json');

// Helper function to read the database
const readDb = () => {
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

// Helper function to write to the database
const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = (dataKey) => {
  // GET all items or a single item if an ID is provided
  router.get('/', (req, res) => {
    const db = readDb();
    if (req.query.id) {
      const item = db[dataKey].find(item => item.id === parseInt(req.query.id));
      if (item) {
        res.json(item);
      } else {
        res.status(404).send('Item not found');
      }
    } else {
      res.json(db[dataKey]);
    }
  });

  // POST a new item
  router.post('/', (req, res) => {
    const db = readDb();
    const newItem = { id: db[dataKey].length > 0 ? Math.max(...db[dataKey].map(item => item.id)) + 1 : 1, ...req.body };
    db[dataKey].push(newItem);
    writeDb(db);
    res.status(201).json(newItem);
  });

  // PUT (update) an item by ID
  router.put('/:id', (req, res) => {
    const db = readDb();
    const id = parseInt(req.params.id);
    const index = db[dataKey].findIndex(item => item.id === id);
    if (index !== -1) {
      db[dataKey][index] = { ...db[dataKey][index], ...req.body, id };
      writeDb(db);
      res.json(db[dataKey][index]);
    } else {
      res.status(404).send('Item not found');
    }
  });

  // PATCH (partial update) an item by ID
  router.patch('/:id', (req, res) => {
    const db = readDb();
    const id = parseInt(req.params.id);
    const index = db[dataKey].findIndex(item => item.id === id);
    if (index !== -1) {
      db[dataKey][index] = { ...db[dataKey][index], ...req.body };
      writeDb(db);
      res.json(db[dataKey][index]);
    } else {
      res.status(404).send('Item not found');
    }
  });

  // DELETE an item by ID
  router.delete('/:id', (req, res) => {
    const db = readDb();
    const id = parseInt(req.params.id);
    const initialLength = db[dataKey].length;
    db[dataKey] = db[dataKey].filter(item => item.id !== id);
    if (db[dataKey].length < initialLength) {
      writeDb(db);
      res.status(204).send();
    } else {
      res.status(404).send('Item not found');
    }
  });

  return router;
};
