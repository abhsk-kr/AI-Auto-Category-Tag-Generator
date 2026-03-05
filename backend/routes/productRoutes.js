const express = require('express');
const router = express.Router();
const {
  generateMetadata,
  saveProduct,
  getProducts,
} = require('../controllers/productController');

router.post('/generate', generateMetadata);
router.post('/save', saveProduct);
router.get('/', getProducts);

module.exports = router;
