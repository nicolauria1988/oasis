import express from "express";
import User from "../data/User.js";

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ email, password });

  req.session.user = user;
  res.redirect("/account");
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    req.session.user = user;
    res.redirect("/account");
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// Logout user
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

export default router;
