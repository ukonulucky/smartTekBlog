const mongoose = require("mongoose");


const CategorySchema = new mongoose.Schema({
    categoryName: {
        type:String,
        required: true
    },
    description: {
        type:String
    },
    post: [{
        type:mongoose.SchemaType.Types.ObjectId,
        ref: "Post"
    }],
    author:{
        type:mongoose.SchemaType.Types.ObjectId,
        ref: "User"
    }
}, {timestamps : true})


//models
const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports =  CategoryModel