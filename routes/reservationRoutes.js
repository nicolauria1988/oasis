import express from "express";
import mongoose from "mongoose";
import Reservation from "../data/Reservation.js";

const router = express.Router();

router.post("/reservation", async (req, res) => {
  const { user, location, startDate, endDate, total } = req.body;

  await new Reservation({
    user,
    location,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    total,
  }).save();

  res.redirect("/account");
});

export default router;
