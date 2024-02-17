const express = require('express');
const { userRegisterController, userLoginController, userGoogleAuthController, userGoogleAuthCallback, userAuthticateController, getAllUsersController, getSingleUserController, logOutUserController } = require('../../controller/user/userController');

const userRouter = express.Router();


userRouter.post("/register", userRegisterController)
userRouter.post("/login", userLoginController)
userRouter.get("/auth/google", userGoogleAuthController )
userRouter.get("/auth/google/callback", userGoogleAuthCallback )
userRouter.get("/authenticate", userAuthticateController)
userRouter.get("/", getAllUsersController)
userRouter.get("/:id", getSingleUserController)
userRouter.post("/logout", logOutUserController)

module.exports = userRouter