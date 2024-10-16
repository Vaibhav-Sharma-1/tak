const Product = require('../models/productModel');

// Get all products with pagination
const getProducts = async (page, limit) => {
  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 10;

  //calculate the number of skips
  const skip = (pageNumber - 1) * pageSize

  const products = await Product.find().skip(skip).limit(pageSize).sort({ createdAt: -1 });
  const totalProducts = await Product.countDocuments();

  return {
    products,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalProducts / pageSize),
    totalProducts,
  };
};

// Get product by ID
const getProductById = async (id) => {
  return await Product.findById(id);
};

// Add new product
const addProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

// Update product by ID
const updateProduct = async (id, updatedData) => {
  return await Product.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete product by ID
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
