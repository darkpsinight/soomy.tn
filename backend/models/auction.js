const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const RoomSchema = new Schema({

  product: {
    type: mongoose.Types.ObjectId,
    ref: "product",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },

  prixPromo: {
    type: Number,
    
  },
  capacity: {
    type: Number,
    required: true,
  },
  mise: {
    type: Number,
    required: true,
  },
  participationPrice: {
    type: Number,
    required: true,
  },
  roomCategory: {
    type: String,
    required: true,
    enum: ['soomy', 'premium']
  },
  ruleDirectCheckout: {
    type: String,
   
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  tenLastMises: {
    type: Array,
  },
  privilege:{
    type: String,
   default:"none",
   enum: ['none', 'rentable', 'populaire','selected']
  },
  winner:{
    type: mongoose.Types.ObjectId,
    ref:'user'
  
  },
  directWinner:{
    type: mongoose.Types.ObjectId,
    ref:'user'
  
  },
  directPrice : {
    type : Number,
  },
  flag:{
    type:Boolean,
    default:false
  },
  endDate:{
    type: Date,
  
  },
  status:{
    type: String,
    default:'pending',
    enum: ['enable', 'disable', 'pending' ,'finished']
  
  },
  niveau:{
    type: String,
    enum: ['copper', 'silver', 'gold']
    
  },
  livraison:{
    type: String,
    enum: ['livraison domicile', 'recuperation chez partenaire']
  },
  participation:{
    type:Number,
    default:0
  }
});
RoomSchema.plugin(mongoosePaginate);
const Room = mongoose.model("room", RoomSchema);

module.exports = Room;