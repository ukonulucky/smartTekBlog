const express = require('express');
const multer = require('multer');


const { createPostController, getAllPostController, getSinglePostController, updatePostController, deleteSinglePostController } = require('../../controller/post/postController');
const storage = require('../../utils/fileUpload/storage');


const postRouter = express.Router();

// creating a multer upload middleware

const upload = multer({storage: storage})




// creating post
postRouter.post("/create",upload.single("postImage"),createPostController)


// geting all post 
postRouter.get("",getAllPostController )

// get a sing post
postRouter.get("/:postId", getSinglePostController)


//update a post

postRouter.put("/:postId", updatePostController)


// delete post 

postRouter.delete("/:postId", deleteSinglePostController)



module.exports = postRouter