import express from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import Location from './data/Location.js';
import locationRoutes from './routes/locationRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import fileUpload from 'express-fileupload';
import methodOverride from 'method-override';
import csrf from 'csurf';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Connect to MongoDB and start the Express server
mongoose.connect('mongodb://localhost:27017/oasis');

const db = mongoose.connection;

db.once('open', () => {
  console.log('MongoDB connected successfully');

  app.listen(port, () => {
    console.log('Server running on port 3000');
  });
});

// Set the EJS views path
app.set('view engine', 'ejs');
app.set('views', path.join('views'));

// Set HTML cookies
app.use(cookieParser());

// Set the session for a user
app.use(
  session({
    key: 'user_sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 7 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/oasis',
      collectionName: 'appSessions',
    }),
  })
);

// For HTML form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// For JSON payloads
app.use(express.json());

// Set the public folder for file includes
app.use(express.static('public'));

// Max 5 files (1MB each)
app.use(
  fileUpload({
    limits: { files: 5, fileSize: 1 * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true,
  })
);

// Support _method in POST forms
app.use(
  methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      return req.body._method;
    }
  })
);

// CSRF protection
const csrfProtection = csrf();
app.use(csrfProtection);

// Middleware for user and csrfToken
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Home route
app.get('/', async (req, res) => {
  const locations = await Location.find({});
  res.render('index', { locations });
});

// Set Register and Login auth routes
app.use(authRoutes);

// User auth middleware
const requireLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Account route
app.get('/account', requireLogin, async (req, res) => {
  const userId = req.session.user._id;
  const locations = await Location.find({ user: userId });
  res.render('account', { locations });
});

// Location routes
app.use(locationRoutes);

// Reservation routes
app.use(reservationRoutes);

export default app;
