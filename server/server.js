const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 minutes per IP
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

// Session Middleware
app.use(session({
  secret: "supersecretkey", // Replace with a strong secret in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
}));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, "../client")));

// Admin authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/admin");
  }
};

// Admin Login Route
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  const dbPath = path.join(__dirname, "database", "db.json");
  const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  if (username === db.adminCredentials.username && password === db.adminCredentials.password) {
    req.session.isAuthenticated = true;
    res.redirect("/admin/dashboard");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Admin Logout Route
app.get("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin");
  });
});

// Admin Dashboard Route (protected)
app.get("/admin/dashboard", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/admin.html")); // Assuming an admin.html in client folder
});

// Admin Panel Route
app.get("/admin", (req, res) => {
  if (req.session.isAuthenticated) {
    res.redirect("/admin/dashboard");
  } else {
    res.sendFile(path.join(__dirname, "../client/admin-login.html")); // Assuming an admin-login.html in client folder
  }
});

// API Routes (placeholder for now)
app.use("/api/hero", require("./routes/hero"));
app.use("/api/about", require("./routes/about"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/services", require("./routes/services"));
app.use("/api/experience", require("./routes/experience"));
app.use("/api/education", require("./routes/education"));
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/statistics", require("./routes/statistics"));
app.use("/api/social", require("./routes/social"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/settings", require("./routes/settings"));

// 404 Page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
