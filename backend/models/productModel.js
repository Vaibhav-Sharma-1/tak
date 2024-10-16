const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  brand: {
    type: String,
  },
  images: {
    type: [String],
    default: ['https://ualbiotech.com/wp-content/uploads/2023/03/C101307_Image_01.jpg'] // Default array with one image
}
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
