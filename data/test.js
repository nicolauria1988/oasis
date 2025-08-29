import addDoc from "./add_doc.js";
import readDoc from "./read_doc.js";
import deleteDoc from "./delete_doc.js";
import { ObjectId } from "mongodb";

// addDoc("testDatabase", "testCollection", {
//   _id: "pricesDocument_08-24-2025",
//   Bitcoin: 100000,
//   Etherium: 10000,
//   Solana: 1000,
// });

readDoc("testDatabase", "testCollection", {
  Bitcoin: 100000,
});

// deleteDoc("testDatabase", "testCollection", {
//   _id: new ObjectId("68aa97e86f6dffcc302b1b02"),
// });

import { connectDB } from "./db.js";
connectDB();
