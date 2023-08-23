const mongoose=require("mongoose");
const usersSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true,
    },
    password:String ,
    following: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
})

const model=mongoose.model("User",usersSchema)
module.exports=model;