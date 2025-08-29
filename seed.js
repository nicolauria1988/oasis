import connectDB from "./data/database.js";
import User from "./data/User.js";
import Location from "./data/Location.js";

await connectDB();

const streets = [
  "5th Avenue",
  "6th Street",
  "Sunset Boulevard",
  "Grand Avenue",
  "Fifth Avenue",
  "The Magnificent Mile",
  "Main Street",
  "South Street",
  "River Walk",
  "Highland Park",
  "Peachtree Street",
  "Fourth Avenue",
  "Woodward Avenue",
  "Charles Street",
  "Country Club Plaza",
  "State Street",
  "Grant Avenue",
  "K Street",
  "Broad Street",
  "Lincoln Avenue",
  "South Boulevard",
  "Fremont Street",
  "Larimer Street",
  "Pike Street",
];
const cities = [
  "New York",
  "Austin",
  "Los Angeles",
  "Phoenix",
  "San Diego",
  "Chicago",
  "Houston",
  "Philadelphia",
  "San Antonio",
  "Dallas",
  "Atlanta",
  "Anchorage",
  "Detroit",
  "Baltimore",
  "Kansas City",
  "Salt Lake City",
  "San Francisco",
  "Sacramento",
  "Augusta",
  "San Jose",
  "Charlotte",
  "Las Vegas",
  "Denver",
  "Seattle",
];
const states = [
  "New York",
  "Texas",
  "California",
  "Arizona",
  "California",
  "Illinois",
  "Texas",
  "Pennsylvania",
  "Texas",
  "Texas",
  "Georgia",
  "Alaska",
  "Michigan",
  "Maryland",
  "Missouri",
  "Utah",
  "California",
  "California",
  "Georgia",
  "California",
  "North Carolina",
  "Nevada",
  "Colorado",
  "Washington State",
];
const country = "United States";
const zipCodes = [
  "10128",
  "78701",
  "90049",
  "85003",
  "92101",
  "60610",
  "77005",
  "19147",
  "78205",
  "75025",
  "30303",
  "99501",
  "48226",
  "21201",
  "64112",
  "84115",
  "94133",
  "95814",
  "30901",
  "95125",
  "28203",
  "89101",
  "80202",
  "98101",
];
const prices = [
  500, 350, 300, 250, 400, 325, 475, 425, 600, 650, 625, 675, 700, 300, 500,
  250, 400, 325, 500, 300, 250, 475, 350, 425,
];
const notes =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const availableDates = { startDate: "09-01-2025", endDate: "12-31-2025" };

await User.deleteMany({});
await Location.deleteMany({});

for (let i = 0; i < 24; i++) {
  const user = await User.create({
    email: `email${i + 1}@example.com`,
    password: "password10",
  });

  await Location.create({
    user: user._id,
    street: streets[i],
    city: cities[i],
    state: states[i],
    country: country,
    zipCode: zipCodes[i],
    price: prices[i],
    images: [
      `/public/images/house-${i + 1}.jpg`,
      `/public/images/house-${i + 2}.jpg`,
      `/public/images/house-${i + 3}.jpg`,
      `/public/images/house-${i + 4}.jpg`,
      `/public/images/house-${i + 5}.jpg`,
    ],
    notes: notes,
    availableDates: availableDates,
  });
}

console.log("Database seeding completed.");
process.exit();
