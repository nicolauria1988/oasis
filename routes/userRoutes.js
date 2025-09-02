import express from 'express';
import path from 'path';
import fs from 'fs';
import User from '../data/User.js';

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

router.get('/user/:id/edit', requireLogin, async (req, res) => {
  res.render('editUser');
});

router.put('/user/:id', requireLogin, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  const {
    email,
    password,
    name,
    phone,
    street,
    city,
    state,
    zipCode,
    country,
  } = req.body;

  const uploadDir = path.join(process.cwd(), 'public/images');
  ensureUploadDir(uploadDir);

  const file = req.files?.image;

  let imagePath;

  if (file) {
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

    imagePath = filename;
  }

  const updateData = {
    email,
    password,
    name,
    phone,
    street,
    city,
    state,
    zipCode,
    country,
  };

  if (imagePath) {
    updateData.avatar = imagePath;
  }

  await User.findByIdAndUpdate(userId, updateData);

  res.redirect('/account');
});

export default router;
