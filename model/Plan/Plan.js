const mongoose = require('mongoose');



const planSchema = new mongoose.Schema({
    planName: {
        type: string,
        require: true
    },
    features:[String],
    limitations: [String],
    price:{
        type:Number,
        required: true
    }
 
}, {timestamps: true});

const PlanModel = mongoose.model("plan",planSchema)

module.exports = PlanModel