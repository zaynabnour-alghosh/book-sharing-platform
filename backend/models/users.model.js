const mongoose=require("mongoose");
const usersSchema=new mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:true,
    },
    password:String  
})

const model=mongoose.model("User",usersSchema)
module.exports=model;