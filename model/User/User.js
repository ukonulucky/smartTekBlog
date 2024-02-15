const mongoose = require("mongoose");

const currentData = new Date()
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    profilePicture: { type: Object, default: null },
    email: { type: String, required: false },
    password: { type: String, required: false },
    passwordResetExpires: { type: Date, default: null },
    googleId: { type: String, required: false },
    authMethod: {
      type: String,
      enum: ["google", "local", "facebook", "github"],
      required: true,
      default: "local",
    },
    passwordRestToken: { type: String, default: null },
    accountVerificationToken: { type: String, default: null },
    accountVerificationTokenExpires: { type: Date, default: null },
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    totalEarnings: { type: Number, default: 0 },
    nextEarningDate: {
      type: Date,
      default: () =>
        new Date(currentData.getFullYear(), currentData.getMonth() + 1, 1), // set to the first day of the next month
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    hasSelectedPlan: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
