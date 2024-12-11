const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: "success", product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: "success", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: "success", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: "success", product });
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
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive search in name
                { description: { $regex: query, $options: 'i' } }, // Case-insensitive search in description
                { category: { $regex: query, $options: 'i' } } // Case-insensitive search in category
            ]
        });

        res.json({ message: "success", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.filterOptions = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        const colors = await Product.distinct('color');
        const sizes = await Product.distinct('size');
        res.json({ message: "success", data: { categories, colors, sizes } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.filterProducts = async (req, res) => {
    const { category, color, size } = req.body;
    try {
        const query = {}
        if (category) {
            query.category = category
        }
        if (color) {
            query.color = color
        }
        if (size) {
            query.size = size
        }
        const products = await Product.find(query);
        res.json({ message: "success", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}