const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
  imageURL:String,
  title:String,
  alt:String,
  
});

const Image = mongoose.model("image", ImageSchema);

module.exports = Image;