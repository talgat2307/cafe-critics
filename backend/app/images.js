const router = require('express').Router();
const { nanoid } = require('nanoid');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const Image = require('../models/Image');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  let query;
  if (req.query.cafe) query = { cafe: req.query.cafe};
  try {
    const images = await Image.find(query);
    res.send(images);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const image = new Image({
      user: req.user._id,
      cafe: req.body.cafe,
      image: req.file.filename,
    });

    await image.save();
    res.send(image);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
