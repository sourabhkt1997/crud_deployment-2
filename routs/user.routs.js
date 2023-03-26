let express=require("express")

let userrouts=express.Router()
let {UserModel}=require("../model/usermodel")
let bcrypt = require('bcrypt')
jwt = require('jsonwebtoken')

userrouts.post("/register",async(req,res)=>{
    let {email,password}=req.body
    try{
        bcrypt.hash(password,5,async(err, hash)=> {
            let data=new UserModel({email:email,password:hash})
            await data.save()
            res.status(200).send({"msg":"new user created"})
        });    
    }
    catch{
        res.status(400).send({"msg":"not able to create user"})  
    }
})

userrouts.post("/login",async(req,res)=>{
     let {email,password}=req.body
   try{
    let user=await UserModel.find({email})
    if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            res.status(200).send({"msg":"login successfull","token":jwt.sign({"userid":user[0]._id},"masai")})
        })

    }
    else{
        res.status(400).send({"message":"login failed"})
    }

   }
   catch(err){
    res.status(400).send({"msg":"check your credentials"})  
    console.log(err)
   }

})


module.exports={userrouts}


