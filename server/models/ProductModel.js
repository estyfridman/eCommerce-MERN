const mongoose = require('mongoose');

const productmodelSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: [true, "Please enter a product title"]},
  price: {
    type: Number,
    required: true
  }, 
  description: String,
  quantityUnitsInStock: { type: Number, required: true, default: 0 },
},
{
    timestamps: true
}
);

const Product2Model = mongoose.model('Products', productmodelSchema);

module.exports = Product2Model;

