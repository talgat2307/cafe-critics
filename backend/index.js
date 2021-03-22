const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./db');
const users = require('./app/users');
const cafes = require('./app/cafes');
const images = require('./app/images');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

connectDB();

app.use('/users', users);
app.use('/cafes', cafes);
app.use('/images', images);

app.listen(8000, () => console.log('Server started'.yellow.inverse));