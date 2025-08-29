import express from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import csurf from "csurf";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// Connect to MongoDB and start the Express server
mongoose.connect("mongodb://localhost:27017/oasis");

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connected successfully");

  app.listen(port, () => {
    console.log("Server running on port 3000");
  });
});

// Set the EJS views path
app.set("view engine", "ejs");
app.set("views", path.join("views"));

// For JSON payloads
app.use(express.json());

// For HTML form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Set HTML cookies
app.use(cookieParser());

// Set the session for a user
app.use(
  session({
    key: "user_sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 7 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/oasis",
      collectionName: "appSessions",
    }),
  })
);

// Set the public folder for file includes
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// Middleware for redirecting the user to the account page
const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/account");
  } else {
    next();
  }
};

// Setup CSRF protection using cookie
const csrfProtection = csurf({ cookie: true });

// Register route
app.get("/register", sessionChecker, csrfProtection, (req, res) => {
  res.render("register");
});

// Login route
app.get("/login", sessionChecker, csrfProtection, (req, res) => {
  res.render("login");
});

// User auth middleware
const requireLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Account route
app.get("/account", requireLogin, (req, res) => {
  res.render("account", { user: req.session.user });
});

// Set Register and Login auth routes
app.use("/auth", authRoutes);

export default app;
