const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/users.model")

const login=async(req,res)=>{
    const{email:login,password}=req.body;
    const user=await User.findOne({email:login})
    if(!user) return res.status(404).send({message:"email/password incorrect"})
    const isValid=await bcrypt.compare(password,user.password)
    if(!isValid) return res.status(404).send({message:"email/password incorrect"})

    const {password:hashedPassword,username,email,_id}=user.toJSON();
    const token=jwt.sign({username,email,_id},process.env.JWT_SECRET)

    res.send({
        token,
        user:user
    })
}
module.exports={login}