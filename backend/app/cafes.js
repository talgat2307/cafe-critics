const router = require('express').Router();
const { nanoid } = require('nanoid');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const Cafe = require('../models/Cafe');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

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
  try {
    const cafes = await Cafe.find();
    res.send(cafes);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cafe = await Cafe.findById({ _id: req.params.id }).populate('reviews.user');
    res.send(cafe);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const cafe = new Cafe({
      ...req.body,
      user: req.user._id,
    });

    if (req.file) {
      cafe.image = req.file.filename;
    }

    await cafe.save();
    res.send(cafe);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/:id/review', [auth], async (req, res) => {
  try {
    const { foodRating, serviceRating, interiorRating, comment } = req.body;

    const cafe = await Cafe.findById(req.params.id);

    if (cafe) {
      const alreadyReviewed = cafe.reviews.find((review) => review.user._id.toString() === req.user._id.toString());

      if (alreadyReviewed) {
        res.status(400).send({ message: 'Cafe already reviewed' });
      } else {
        const review = {
          foodRating: Number(foodRating),
          serviceRating: Number(serviceRating),
          interiorRating: Number(interiorRating),
          comment,
          user: req.user._id,
        };

        cafe.reviews.push(review);

        cafe.numReviews = cafe.reviews.length;

        const averageFoodRating = cafe.reviews.reduce((acc, item) => item.foodRating + acc ,0) / cafe.reviews.length;
        const averageServiceRating = cafe.reviews.reduce((acc, item) => item.serviceRating + acc, 0) / cafe.reviews.length;
        const averageInteriorRating = cafe.reviews.reduce((acc, item) => item.interiorRating + acc, 0) / cafe.reviews.length;
        const sum = averageFoodRating + averageServiceRating + averageInteriorRating;
        cafe.rating = sum / 3;

        await cafe.save();
        res.status(201).send({ message: 'Review added' });
      }
    } else {
      res.status(404).send({ message: 'Cafe not found' });
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id);
    await cafe.remove();
    res.send({ message: 'Cafe removed'});
  } catch (e) {
    res.status(400).send({ error: 'Cafe not found'});
  }
});

module.exports = router;