const Product = require('../models/Product');
const { generateProductMetadata } = require('../services/aiService');

/**
 * POST /api/products/generate
 * Calls the AI to generate metadata for a product (does NOT save).
 */
async function generateMetadata(req, res) {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: 'Both "title" and "description" are required.',
      });
    }

    const aiResult = await generateProductMetadata(title, description);

    return res.json({
      success: true,
      data: {
        title,
        description,
        ...aiResult,
      },
    });
  } catch (error) {
    console.error('Generate error:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate product metadata.',
    });
  }
}

/**
 * POST /api/products/save
 * Saves a product (with AI-generated fields) to the database.
 */
async function saveProduct(req, res) {
  try {
    const {
      title,
      description,
      primary_category,
      sub_category,
      seo_tags,
      sustainability_filters,
    } = req.body;

    if (!title || !description || !primary_category || !sub_category || !seo_tags) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields.',
      });
    }

    const product = await Product.create({
      title,
      description,
      primary_category,
      sub_category,
      seo_tags,
      sustainability_filters: sustainability_filters || [],
    });

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Save error:', error.message);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to save product.',
    });
  }
}

/**
 * GET /api/products
 * Returns all saved products, newest first.
 */
async function getProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: products });
  } catch (error) {
    console.error('Fetch error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch products.',
    });
  }
}

module.exports = { generateMetadata, saveProduct, getProducts };
