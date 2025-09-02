// models/Location.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const locationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
      },
    ],
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length == 5;
        },
      },
    },
    notes: {
      type: String,
      required: true,
      minlength: 100,
      maxlength: 600,
    },
    availableDates: [
      {
        startDate: { type: String },
        endDate: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Location = model('Location', locationSchema);

export default Location;
