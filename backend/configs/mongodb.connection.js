const mongoose=require('mongoose')
const mongoDb=()=>{
  mongoose.connect("mongodb+srv://zeeghosh:gJANrC6FbEDNYeVM@cluster0.tawzkks.mongodb.net/")
  .then(()=>{
    console.log("Connected to MongoDB")
  })
  .catch(err => {
    console.log(err)
  })
}
module.exports=mongoDb