// third party libraries
require("dotenv").config()
const express = require('express');
const cors = require('cors')
const asyncHandler = require("express-async-handler")

// third party libraries


// form my application
const dbConnetFunc = require('./config/db/dbConnect');
const PostModel = require("./model/Post/Post");
const expressAsyncHandler = require("express-async-handler");

// form my application


const PORT = process.env.PORT || 5000
const app = express();


// cors configuration

const corsOptions = {
    origin:["http://localhost:5173"],
    Credential: true
}

//Middleware

app.use(express.json())
app.use(cors(corsOptions))


// creating post
app.post("/api/v1/posts/create", asyncHandler(async (req, res, next) => { 
    
    const {description} = req.body
    console.log(description)
      if(!description){
  throw new Error("Post description must be provided")
      }

    
    const createdPost = await PostModel.create(req.body)
        return res.json({
           status:"success",
           message:"Post created successfull",
           createdPost
        })
    
}))


// geting all post 
app.get("/api/v1/posts", async(req,res) => {
  try{
    const posts = await PostModel.find();
       return res.json({
        status:"success",
        message:"All post fetched successfully",
        posts
       })
  }catch(err){
       res.json(err)
  }
})

// get a sing post
app.get("/api/v1/posts/:postId",   asyncHandler(async(req, res) => {
        // get post id
    const {postId} = req.params
    console.log(postId)
    // get a single post by its id
  const postFound = await PostModel.findById(postId)
  if(!postFound){
      throw new Error("No post found")
  }
  return res.json({
      status:"success",
      message:"Post found successfully",
      postFound
  })
  
    
  
  
  }))


//update a post

app.put("/api/v1/posts/:postId", expressAsyncHandler(async(req, res) => {
 const {title, description} = req.body
     // get postId form params
   
     const {postId} = req.params
 const postFound = await PostModel.findById(postId);
 if(!postFound){
     throw new Error("No post found")
 }
 // update post found
 const updatedPost = await PostModel.findByIdAndUpdate(postId, {
     title: title ? title : postFound.title,
     description: description ? description : postFound.description
 }, {
     new: true
 })
 
  return res.json({
     status:"success",
     message:"Post updated successfully",
     updatedPost
  })
    
 }))


// delete post 

app.delete("/api/v1/posts/:postId", asyncHandler( async(req, res) => {
 const {postId} = req.params
 const deletedPost = await PostModel.findByIdAndDelete(postId)
if(!deletedPost){
 throw new Error("Failed to delete post")
}
return res.json({
    status:"success",
    message:"Post deleted successfully",
    deletedPost
})
   
} ))

app.use((req, res, next) => {
    res.status(404).json({
        message:"route not found"
    })
})

app.use((err, req, res, next) => {
    const errorMessage = err.message
    // the stack proprty tells what area in the application the error happenz
    const stack = err.stack
res.status(500).json({
    message: errorMessage,
    stack
})

})

const connetDbAndServer = async () => {
        console.log("code ran")
    try {
        const res = await dbConnetFunc()
        if(res){
            app.listen(PORT, function(){
                console.log(`Db connected and server listening on port now ${PORT}`)
            })
        }
        
    } catch (error) {
      console.log(`error: ${error.message}`)
    }
}


connetDbAndServer()