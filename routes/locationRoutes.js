import express from "express";
import mongoose from "mongoose";
import Location from "../data/Location.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const locationId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    return res.status(400).json({ error: "Invalid location ID" });
  }

  const location = await Location.findById(locationId);

  if (!location) return res.status(404).json({ error: "Location not found" });

  res.render("location", { user: req.session.user, location });
});

export default router;
