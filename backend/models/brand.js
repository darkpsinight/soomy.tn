const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo :{
     type: mongoose.Types.ObjectId,
    ref: "image",
  },
  createdAt:{
    type:Date,
    default: new Date()
  }
});
brandSchema.plugin(mongoosePaginate);
const Brand = mongoose.model("brand", brandSchema);

module.exports = Brand;