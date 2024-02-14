const express = require('express');
const multer = require('multer');


const { createPostController, getAllPostController, getSinglePostController, updatePostController, deleteSinglePostController } = require('../../controller/post/postController');
const storage = require('../../utils/fileUpload/storage');


const postRouter = express.Router();

// creating a multer upload middleware

const upload = multer({storage: storage})




// creating post
postRouter.post("/api/v1/posts/create",upload.single("postImage"),createPostController)


// geting all post 
postRouter.get("/api/v1/posts",getAllPostController )

// get a sing post
postRouter.get("/api/v1/posts/:postId", getSinglePostController)


//update a post

postRouter.put("/api/v1/posts/:postId", updatePostController)


// delete post 

postRouter.delete("/api/v1/posts/:postId", deleteSinglePostController)



module.exports = postRouter