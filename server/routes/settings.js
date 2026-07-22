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

// GET all settings data
router.get("/", (req, res) => {
  const db = readDb();
  res.json({
    portfolioInfo: db.portfolioInfo,
    theme: db.theme,
    favicon: db.favicon,
    seo: db.seo,
    navbar: db.navbar,
    footer: db.footer,
    contactDetails: db.contactDetails
  });
});

// PUT (update) settings data
router.put("/", (req, res) => {
  const db = readDb();
  const { portfolioInfo, theme, favicon, seo, navbar, footer, contactDetails } = req.body;

  if (portfolioInfo) db.portfolioInfo = { ...db.portfolioInfo, ...portfolioInfo };
  if (theme) db.theme = { ...db.theme, ...theme };
  if (favicon) db.favicon = favicon;
  if (seo) db.seo = { ...db.seo, ...seo };
  if (navbar) db.navbar = { ...db.navbar, ...navbar };
  if (footer) db.footer = { ...db.footer, ...footer };
  if (contactDetails) db.contactDetails = { ...db.contactDetails, ...contactDetails };

  writeDb(db);
  res.json({
    portfolioInfo: db.portfolioInfo,
    theme: db.theme,
    favicon: db.favicon,
    seo: db.seo,
    navbar: db.navbar,
    footer: db.footer,
    contactDetails: db.contactDetails
  });
});

module.exports = router;
