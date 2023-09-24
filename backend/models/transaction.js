const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const transcationSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref:'user',
    required: true,
  },
  createdAt:{
    type:Date,
    default: new Date()
  },
  service:{
      type:String,
      required:true
  },
  montant:{
      type:Number,
      required:true
  },
  total:{
      type:Number,
     
  },
  status:{
      type:String,
      required:true
  },
  ref:{
      type:String,
      required:true
  },

 
});
transcationSchema.plugin(mongoosePaginate);
const Transaction = mongoose.model("transaction", transcationSchema);

module.exports = Transaction;