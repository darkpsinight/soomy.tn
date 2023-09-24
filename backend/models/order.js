const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const orderSchema = new Schema({
  ref_order: {
    type: String,
 
  },
  date: {
    type: Date,
  },
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  Adresse: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  payment_id: {
    type: mongoose.Types.ObjectId,
    ref: "transaction",
  },

  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  room_id: {
    type: mongoose.Types.ObjectId,
    ref: "room",
    
  },
  ville: {
    type: String,
    
  },
  zip: {
    type: String,
  },
  method_of_paiement:{
    type: String,
  },
  notes:{
    type: String
  },
  expiration:{
    type: Date,
  },
  status_payment:{
    type:String,
    enum:["en attente" , "en attente de virement" , "payé" ],
    default:"en attente"
  },
  status_delivery:{
    type:String,
    enum:["-" , "livraison en cours" , "en attente de livraison" , "livraison terminé"],
    default:"-"
  },
  typeWinner:{
    type:String,
    enum:["soomy","premium"]
  }

});
orderSchema.plugin(mongoosePaginate);
const Order = mongoose.model("order", orderSchema);

module.exports = Order;