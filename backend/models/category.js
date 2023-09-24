const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt:{
    type:Date,
    default: new Date()
  }
 
});
categorySchema.plugin(mongoosePaginate);
const Category = mongoose.model("category", categorySchema);

module.exports = Category;