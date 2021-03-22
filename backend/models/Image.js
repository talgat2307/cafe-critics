const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cafe: {
    type: Schema.Types.ObjectId,
    ref: 'Cafe',
    required: true,
  },
  image: {
    type: String,
    required: [true, 'Field image is required to fill']
  }
});

const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;