const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packPurchaseSchema = new Schema({
  pack_id: {
    type: mongoose.Types.ObjectId,
    ref: "pack", // Reference to the Pack model
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  transaction_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  num_uses: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PackPurchase = mongoose.model("packPurchase", packPurchaseSchema);

module.exports = PackPurchase;
