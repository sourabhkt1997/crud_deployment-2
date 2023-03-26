let mongoose=require("mongoose")

let userSchema=mongoose.Schema({
   
    email:String,
    password:String
},{
    versionKey:false
})

 UserModel=mongoose.model("userdata",userSchema)

module.exports={UserModel}