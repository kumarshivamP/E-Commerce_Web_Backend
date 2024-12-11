// src/routes/productRoutes.js
const express = require('express');
const { createProduct, getAllProduct, getProductById, updateProduct, searchProductByKeyword, filterOptions, filterProducts } = require('../controllers/productController');

const router = express.Router();

// Create a new product
router.post('/', createProduct);

// Get all products
router.get('/', getAllProduct);

// Get a product by ID
router.get('/productById/:id',getProductById );

// Update a product
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', );

// Search products by Keyword
router.get('/search', searchProductByKeyword);

// Fetch filter options
router.get('/filter-options', filterOptions);

// Fetch filtered Products 
router.post('/filter-products', filterProducts);

module.exports = router;