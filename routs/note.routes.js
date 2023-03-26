let express=require("express")
let noterouts=express.Router()

let {NoteModel}=require("../model/notemodel")
const jwt=require("jsonwebtoken")
let {notedate}=require("../middleware/notemiddleware")

noterouts.post("/addnote",notedate,async(req,res)=>{
    try{
        let data=new NoteModel(req.body)
        await data.save()
        res.status(200).send({"msg":"new note added"})
    }
    catch(err){
        console.log(err)
        res.status(400).send({"msg":"not able to add notes"})
    }
})
// /**
//  * @swagger
//  * Components:
//  *   schema:
//  *    user:
//  *       type:object
//  *       propertied:
//  *              id:
//  *                 type:string
//  *                 description:The autogenarated if by mongo DB
//  *              note:
//  *                 type:string
//  *                  description:note created by user
//  *              author:
//  *                  type:string
//  *                  description:auther of the note
//  *               createdat:
//  *                 type:string
//  *                 description:date atwhich the change happned           auto genarated 
//  *              
//  */


// /**
//  * @swagger
//  * /users:
//  * get:
//  *   summary:This routes is to get all notes from database
//  *   responses:
//  *        200:
//  *            description:The list ofa all the users
//  *            Content:application/json:
//  *                         schema:
//  *                               type:array
//  *                                item:
//  *                                      $ref:"#/Components/schema/User"
//  *        400:
//  *            description:Bad request
//  */
noterouts.get("/",async(req,res)=>{
    let token=req.headers.authorization.split(" ")[1]
    let decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
        let data=await NoteModel.find({"userid":decoded.userid})
        res.status(200).send(data)
        }
        else{
            res.status(400).send({"messgae":"user has not been created any todo yet"})
        }
    }catch(err){
        console.log(err)
        res.status(400).send({"msg":"not able to get"})
    }
})

noterouts.patch("/update/:id",async(req,res)=>{
    let {id}=req.params
    let payload=req.body
    let token=req.headers.authorization.split(" ")[1]
    let decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
            await NoteModel.findByIdAndUpdate({_id:id},payload)
            res.status(200).send({"messgae":" updated"})
        }
        else{
            res.status(400).send({"messgae":"cant able to update"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({"msg":"not able to edit"})
    }
})

noterouts.delete("/delete/:id",async(req,res)=>{
    let {id}=req.params
    let token=req.headers.authorization.split(" ")[1]
    let decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
            await NoteModel.findByIdAndDelete({_id:id})
            res.status(200).send({"message":"note deleted"})
        }
        else{
            res.status(400).send({"messgae":"cant able to delete"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({"msg":"not able to delete"})
    }
})




module.exports={noterouts}

