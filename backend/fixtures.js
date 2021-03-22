const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/User');
const Cafe = require('./models/Cafe');
const users = require('./data/users');
const cafes = require('./data/cafes');
const connectDB = require('./db');
dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Cafe.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleCafes = cafes.map((cafe) => {
      return { ...cafe, user: adminUser };
    });

    await Cafe.insertMany(sampleCafes);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (e) {
    console.error(`${e}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (e) {
    console.error(`${e}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

