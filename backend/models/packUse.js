const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packUseSchema = new Schema({
  room_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  selectedPurchasedPack_Id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },  
  remaining: {
    type: Number,
    default: 0,
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PackUse = mongoose.model("packUse", packUseSchema);

module.exports = PackUse;
