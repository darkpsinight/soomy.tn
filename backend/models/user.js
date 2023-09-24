const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  adresse: {
    type: String,
  },
  password: {
    type: String,
  },
  genre: { type: String, enum: ["male", "female", "other"] },
  profile_img: {
    type: mongoose.Types.ObjectId,
    ref: "image",
   
  },
  credit: {
    type: {
      montant: { type: Number },
      updatedAt: {
        type: Date,
      },
    },
    default: {
      montant: 0,
      updatedAt: new Date(),
    },
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  bookmarks: {
    type: [mongoose.Types.ObjectId],
    ref: "room",
  },
  approved: {
    type: Boolean,
    default: false,
  },
  facebookId: String,
  googleId: String,
  joinDate: { type: Date, default: Date.now },
});
UserSchema.plugin(mongoosePaginate);
const User = mongoose.model("user", UserSchema);

module.exports = User;
