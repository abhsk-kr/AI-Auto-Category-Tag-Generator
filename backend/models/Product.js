const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    primary_category: {
      type: String,
      required: true,
      enum: [
        'Electronics',
        'Apparel',
        'Home & Kitchen',
        'Beauty & Personal Care',
        'Grocery',
        'Toys',
      ],
    },
    sub_category: {
      type: String,
      required: true,
    },
    seo_tags: {
      type: [String],
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 15,
        message: 'SEO tags must contain between 1 and 15 items',
      },
    },
    sustainability_filters: {
      type: [String],
      validate: {
        validator: (arr) =>
          arr.every((tag) =>
            [
              'plastic-free',
              'compostable',
              'vegan',
              'recycled',
              'organic',
              'cruelty-free',
              'energy-efficient',
            ].includes(tag)
          ),
        message: 'Invalid sustainability filter provided',
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
