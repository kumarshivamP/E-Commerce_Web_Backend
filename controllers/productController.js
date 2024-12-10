const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
        console.log(req.body)
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.searchProductByKeyword = async (req, res) => {
    const { query } = req.query;
    const searchQuery = query.toLowerCase()
    try {
        const products = await Product.find({
            $where: function() {
                return Object.values(this).some(value => 
                    typeof value === 'string' && value.toLowerCase().includes(searchQuery)
                );
            }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.filterOptions = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        const colors = await Product.distinct('color');
        const sizes = await Product.distinct('size');
        res.json({ categories, colors, sizes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}