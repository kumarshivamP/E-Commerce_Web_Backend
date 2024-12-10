// src/routes/productRoutes.js
const express = require('express');
const { createProduct, getAllProduct, getProductById, updateProduct, searchProductByKeyword, filterOptions } = require('../controllers/productController');

const router = express.Router();

// Create a new product
router.post('/', createProduct);

// Get all products
router.get('/', getAllProduct);

// Get a product by ID
router.get('/:id',getProductById );

// Update a product
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', );

// Search products by Keyword
router.get('/search', searchProductByKeyword);

// Fetch filter options
router.get('/filter-options', filterOptions);

module.exports = router;