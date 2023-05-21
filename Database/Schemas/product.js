const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productImage: {
    type: Buffer,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  }

});


module.exports = mongoose.model("product", productSchema);
