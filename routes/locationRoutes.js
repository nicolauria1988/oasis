import express from 'express';
import path from 'path';
import fs from 'fs';
import Location from '../data/Location.js';

const router = express.Router();

const requireLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Middleware to ensure the upload directory exists
const ensureUploadDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

router.get('/location/new', requireLogin, async (req, res) => {
  res.render('addLocation', { ...res.locals });
});

router.get('/location/:id', async (req, res) => {
  const locationId = req.params.id;
  const location = await Location.findById(locationId).populate('reservations');
  res.render('location', { location, ...res.locals });
});

router.post('/location', requireLogin, async (req, res) => {
  const { street, city, state, zipCode, country, price, notes } = req.body;

  const uploadDir = path.join(process.cwd(), 'public/images');
  ensureUploadDir(uploadDir);

  let images = req.files?.images;

  if (images && !Array.isArray(images)) {
    images = [images];
  }

  const imagePaths = [];

  if (images) {
    for (const file of images) {
      // Validate mimetype
      if (!file.mimetype.startsWith('image/')) {
        return res.status(400).send('Only image files are allowed!');
      }

      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.name);
      const filename = `${file.fieldname || 'image'}-${uniqueSuffix}${ext}`;

      const savePath = path.join(uploadDir, filename);

      // Move the file to the upload directory
      await file.mv(savePath);

      imagePaths.push(filename);
    }
  }

  const location = new Location({
    user: req.session.user._id,
    street,
    city,
    state,
    zipCode,
    country,
    price,
    notes,
    images: imagePaths,
  });

  await location.save();
  res.redirect('/account');
});

router.get('/location/:id/edit', async (req, res) => {
  const locationId = req.params.id;
  const location = await Location.findById(locationId);
  res.render('editLocation', { location, ...res.locals });
});

router.put('/location/:id', async (req, res) => {
  const locationId = req.params.id;

  const {
    street,
    city,
    state,
    zipCode,
    country,
    price,
    notes,
    availableDates,
  } = req.body;

  const uploadDir = path.join(process.cwd(), 'public/images');
  ensureUploadDir(uploadDir);

  let images = req.files?.images;

  if (images && !Array.isArray(images)) {
    images = [images];
  }

  const imagePaths = [];

  if (images) {
    for (const file of images) {
      // Validate mimetype
      if (!file.mimetype.startsWith('image/')) {
        return res.status(400).send('Only image files are allowed!');
      }

      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.name);
      const filename = `${file.fieldname || 'image'}-${uniqueSuffix}${ext}`;

      const savePath = path.join(uploadDir, filename);

      // Move the file to the upload directory
      await file.mv(savePath);

      imagePaths.push(filename);
    }
  }

  const updateData = {
    street,
    city,
    state,
    zipCode,
    country,
    price,
    notes,
  };

  if ('availableDates' in req.body) {
    updateData.availableDates = availableDates;
  }

  if (imagePaths.length > 0) {
    updateData.images = imagePaths;
  }

  await Location.findByIdAndUpdate(locationId, updateData);

  res.redirect('/account');
});

router.get('/location/:id/availability', requireLogin, async (req, res) => {
  const locationId = req.params.id;
  const location = await Location.findById(locationId).populate('reservations');
  res.render('availability', { location, ...res.locals });
});

export default router;
