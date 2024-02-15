// third party libraries
require("dotenv").config()
const express = require('express');
const cors = require('cors')


// third party libraries


// form my application
const dbConnetFunc = require('./config/db/dbConnect');
const postRouter = require("./route/post/postRoute");
const { userRegisterController } = require("./controller/user/userController");
const passportConfig = require("./utils/passport-config");
const userRouter = require("./route/user/userRoute");

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

// Passport middleware

app.use(passportConfig.initialize())


// Routes
app.use("/api/v1/posts",postRouter)
app.use("/api/v1/user",userRouter)

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