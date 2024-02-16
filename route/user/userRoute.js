const express = require('express');
const { userRegisterController, userLoginController, userGoogleAuthController, userGoogleAuthCallback } = require('../../controller/user/userController');

const userRouter = express.Router();


userRouter.post("/register", userRegisterController)
userRouter.post("/login", userLoginController)
userRouter.get("/auth/google", userGoogleAuthController )
userRouter.get("/auth/google/callback", userGoogleAuthCallback )

module.exports = userRouter