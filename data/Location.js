// models/Location.js

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const locationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sreet: {
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
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
      minlength: 100,
      maxlength: 300,
    },
    availableDates: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Location = model("Location", locationSchema);

export default Location;
