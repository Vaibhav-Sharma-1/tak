const productService = require('../services/productService');
const asyncHandler = require('express-async-handler');

// Get all products with pagination
const getProducts = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const products = await productService.getProducts(page, limit);
  res.status(200).json(products);
});

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.status(200).json(product);
});

// Add new product
const addProduct = asyncHandler(async (req, res) => {
  const product = await productService.addProduct(req.body);
  res.status(201).json(product);
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await productService.updateProduct(req.params.id, req.body);
  if (!updatedProduct) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.status(200).json(updatedProduct);
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productService.deleteProduct(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.status(200).json({ message: 'Product deleted successfully' });
});

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
