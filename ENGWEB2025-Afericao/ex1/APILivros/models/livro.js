const mongoose = require('mongoose');

const livrosSchema = new mongoose.Schema({
  _id: String,
  title: String,
  series: String,
  author: [String],
  rating: Number,
  description: String,
  language: String,
  isbn: Number,
  genres: [String],
  characters: [String],
  bookFormat: String,
  edition: String,
  pages: Number,
  publisher: String,
  publishDate: String,
  firstPublishDate: Number,
  awards: [String],
  numRatings: Number,
  ratingsByStars: [Number],
  likedPercent: Number,
  setting: [String],
  coverImg: String,
  bbeScore: Number,
  bbeVotes: Number,
  price: Number
}, { versionKey: false });

module.exports = mongoose.model('livros', livrosSchema);