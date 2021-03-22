const router = require('express').Router();
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.status(404).send({ error: 'Not found' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).send({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).send({ error: 'Invalid email or password' });
    }
  } catch (e) {
    res.status(401).send(e);
  }
});


module.exports = router;