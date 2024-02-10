const mongoose = require('mongoose');



const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    reference: {
        type: string,
        require: true
    },
    status: {
        type: string,
        require: true
    },
    message: {
        type: String,
        default:"pending",
     required:true
    },
    currency: {
        type: String,
     required:true
    },
  subscriptionPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Plan",
        required: true
    },
    amount: {
        type: Number,
        default:0
    },
    monthlyRequestCount: {
        type: Number
    },
});

const PaymentModel = mongoose.model("Notification",paymentSchema)

module.exports = PaymentModel