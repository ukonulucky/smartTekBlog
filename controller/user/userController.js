const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt =require("jsonwebtoken");



// register user controller
const userRegisterController = expressAsyncHandler(async (req, res) => {

  const { email, password, userName} = req.body;

  // check if email and password are sent
  if (!email || !password || !userName) {
    throw new Error("Missing credentials");
  }

  // find if user already exist

  const foundUser = await UserModel.findOne({ email, userName });

  if (foundUser) {
    throw new Error("User already exists");
  }

  // hash user password


    // Hash the password with the generated salt
 const hashedPassword = await bcrypt.hash(password, 10)

    const registeredUser = await UserModel.create({
        userName, password:hashedPassword, email
    })

  return res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: registeredUser,
  });
});

const userLoginController = expressAsyncHandler(async(req,res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) return next(err)
        if(!user) return res.status(401).json({message: info.message})
        console.log("this is the user",user)
// set jwt token for the user
const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET)

// set cookie

res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,    // cookie will expire in 24 hours
    httpOnly: true,
    sameSite:"strict",
    secure:false

})

return res.status(201).json({
    status: "success",
    message:"Login successful",
    userName:user?.userName,
    id:user?._id
})


    })(req, res, next);
})

// googleAuth
const userGoogleAuthController = passport.authenticate("google", {
  scope:["profile"]
})

//googleAuthCallBack

const userGoogleAuthCallback = expressAsyncHandler(async(req, res, next) => {
passport.authenticate("google", {
  failureRedirect:"http://localhost:5173",
  session: false
}, (error, user,info ) => {
 
  if(error) return next(error)
if(!user){
 return res.redirect("http://localhost:5173/login")
}

// create a token

// const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET)
const token =  jwt.sign({id : user?._id}, process.env.JWT_SECRET, {
  expiresIn:"3d"
})
 res.cookie("token", token, {
  sameSite:"strict", 
  httpOnly: true,
  maxAge: 60 * 60 * 24 // expires in 1 day
 })

 res.redirect("http://localhost:5173/dashboard")
} 

)(req, res, next)

})


module.exports = { userRegisterController, userLoginController, userGoogleAuthController, userGoogleAuthCallback};
