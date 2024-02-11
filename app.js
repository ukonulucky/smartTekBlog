// third party libraries
require("dotenv").config()
const express = require('express');
const cors = require('cors')

// third party libraries


// form my application
const dbConnetFunc = require('./config/db/dbConnect');
const PostModel = require("./model/Post/Post")

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
app.post("/api/v1/posts/create", async (req, res) => {
    
     try{
     const createdPost = await PostModel.create(req.body)
         return res.json({
            status:"success",
            message:"Post created successfull",
            createdPost
         })
     }catch(error){
          res.json(error)
          process.exit(1)
     }
})


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
app.get("/api/v1/posts/:postId",  async(req, res) => {
  try {
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

  } catch (error) {
    // throw new Error(error) 
    console.log(error.message)
  }


})


//update a post

app.put("/api/v1/posts/:postId", async(req, res) => {
   try{
const {title, description} = req.body
    // get postId form params
    console.log(req.body)
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
   }catch(error){
 throw new Error(error)
   } 
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