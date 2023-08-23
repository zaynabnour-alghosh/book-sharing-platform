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
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          username: String,
        
        },
      ],
    followers: [
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: String,
    },
    ],
})

const model=mongoose.model("User",usersSchema)
module.exports=model;