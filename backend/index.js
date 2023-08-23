const express = require("express")
const app =express();
require("dotenv").config()
const mongoDb = require("./configs/mongodb.connection");
app.use(express.json())

app.listen(8000,(err)=>{
    if(err){
        throw err
    }
    else{
        console.log("connected successfully");
    }
    mongoDb()
})