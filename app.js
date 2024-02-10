require("dotenv").config()
const express = require('express');
const dbConnetFunc = require('./config/db/dbConnect');


const PORT = process.env.PORT || 5000
const app = express();


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