const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  brand: {
    type: mongoose.Types.ObjectId,
    ref: "brand",
  },

  image: {
    type: mongoose.Types.ObjectId,
    ref: "image",
  },
  image1: {
    type: mongoose.Types.ObjectId,
    ref: "image",
  },
  image2: {
    type: mongoose.Types.ObjectId,
    ref: "image",
  },
  partner: {
    type: mongoose.Types.ObjectId,
    ref: "partner",
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  garantie: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  
});
ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
