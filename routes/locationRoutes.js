import express from 'express';
import mongoose from 'mongoose';
import Location from '../data/Location.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const locationId = req.params.id;
  const location = await Location.findById(locationId).populate('reservations');
  res.render('location', { location });
});

export default router;
