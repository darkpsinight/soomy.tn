const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const participationSchema = new Schema({
  transaction: {
    type: mongoose.Types.ObjectId,
    ref: "transaction",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  room: {
    type: mongoose.Types.ObjectId,
    ref: "room",
    required: true,
  },
  montant: {
    type: Number,
    default: 0,
  },
  NumberOfClicks: {
    type: Number,
    default: 0,
  },
  flagEmail: {
    type: Boolean,
    default: false,
  },
  ban: {
    type: Boolean,
    default: false,
  },

  freeCredit: {
    type: Number,
    default: 15,
  },

  flagModal: {
    type: Boolean,
    default: false,
  },
});
participationSchema.plugin(mongoosePaginate);
const Participation = mongoose.model("participation", participationSchema);

module.exports = Participation;
