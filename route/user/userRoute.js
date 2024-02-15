const express = require('express');
const { userRegisterController, userLoginController } = require('../../controller/user/userController');

const userRouter = express.Router();


userRouter.post("/register", userRegisterController)
userRouter.post("/login", userLoginController)


module.exports = userRouter