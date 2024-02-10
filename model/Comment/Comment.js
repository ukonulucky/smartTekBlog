const mongoose = require('mongoose')


const CommentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
         ref: "Author",
         required: true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    }
}, {
    timestamps:true
})


const ComentModel = mongoose.model("comment", CommentSchema)

module.exports = ComentModel