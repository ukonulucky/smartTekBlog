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
  console.log("ran", foundUser);
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
// set jwt token for the user
const token = jwt.sign({id: user?._id}, process.env.JWT_SIGNATURE)
console.log(token)
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


module.exports = { userRegisterController, userLoginController};
