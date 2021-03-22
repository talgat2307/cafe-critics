const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    foodRating: { type: Number, default: 0, required: true },
    serviceRating: { type: Number, default: 0, required: true },
    interiorRating: { type: Number, default: 0, required: true },
    comment: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    datetime: {
      type: Date,
      default: Date.now,
    },
  },
);

const cafeSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
);

const Cafe = mongoose.model('Cafe', cafeSchema);
module.exports = Cafe;