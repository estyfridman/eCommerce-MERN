const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {type: String, required:true},
  price: { type: Number, required:true},
  description: String,
  quantityUnitsInStock: { type: Number, required: true },
  image: String,
},
{
  timestamps: true,
}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

