const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const partnerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  
 adresse:{
    type: String,
    required:true,
   
  },
 phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image:{
    ref:'image',
    type:mongoose.Types.ObjectId,
    required:true
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  
});
partnerSchema.plugin(mongoosePaginate);
const Partner = mongoose.model("partner", partnerSchema);

module.exports = Partner;