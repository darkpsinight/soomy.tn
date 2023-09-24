const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packSchema = new Schema({
  num_uses: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  image: {
    type: mongoose.Types.ObjectId,
    ref: "image",
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Middleware to automatically update "num_uses" in "packPurchase" documents when num_uses in "pack" document changes
packSchema.pre("save", async function (next) {
  const pack = this;
  const PackPurchase = mongoose.model("packPurchase");

  // Find all packPurchase documents linked to this pack
  const packPurchases = await PackPurchase.find({ pack_id: pack._id });

  // Update "num_uses" in each packPurchase document
  for (const packPurchase of packPurchases) {
    packPurchase.num_uses = pack.num_uses;
    await packPurchase.save();
  }

  next();
});

const Pack = mongoose.model("pack", packSchema);

module.exports = Pack;
