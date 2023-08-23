const express = require("express")
const app =express();

const mongoDb = require("./configs/mongodb.connection");
require("dotenv").config()
app.use(express.json())

const authRouter = require("./routes/auth.routes")
app.use("/auth", authRouter)

const userRouter = require("./routes/users.routes")
app.use("/user", userRouter)

app.listen(8000,(err)=>{
    if(err){
        throw err
    }
    else{
        console.log("connected successfully");
    }
    mongoDb()
})