const expressAsyncHandler= require("express-async-handler")
const PostModel = require("../../model/Post/Post")



// create post controller
const createPostController =  expressAsyncHandler(async (req, res, next) => { 
    console.log(req.file)
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
    
})

//get all post
const getAllPostController = expressAsyncHandler(async(req,res) => {
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
  }
)


// get single post
const getSinglePostController =  expressAsyncHandler(async(req, res) => {
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

})

// update sigle post
const updatePostController = expressAsyncHandler(async(req, res) => {
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
       
    })

// delete single post
  const deleteSinglePostController = expressAsyncHandler( async(req, res) => {
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
      
   } )  


module.exports = {createPostController, getAllPostController, getSinglePostController, updatePostController, deleteSinglePostController}