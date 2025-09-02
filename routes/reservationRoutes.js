import express from 'express';
import Reservation from '../data/Reservation.js';
import Location from '../data/Location.js';

const router = express.Router();

router.post('/reservation', async (req, res) => {
  const { user, location, startDate, endDate, total } = req.body;

  const reservation = await new Reservation({
    user,
    location,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    total,
  }).save();

  await Location.findByIdAndUpdate(location, {
    $push: { reservations: reservation._id },
  });

  res.redirect('/account');
});

export default router;
