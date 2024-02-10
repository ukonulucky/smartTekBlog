const mongoose = require('mongoose');



const earningSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    amount:{
        type:Number,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"post",
        require: true
    },
    calculateOn: {
        type: Date,
    default:Date.now
    }
});


const EarningModel = mongoose.model("Earning",earningSchema)

module.exports = EarningModel