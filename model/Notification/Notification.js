const mongoose = require('mongoose');



const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post",
        require: true
    },
    message: {
        type: String,
     required:true
    },
    isRead: {
        type: Boolean,
      default:false
    }
});

const NotificationModel = mongoose.model("Notification",notificationSchema)

module.exports = NotificationModel