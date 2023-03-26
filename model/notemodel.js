let mongoose=require("mongoose")

let noteSchema=mongoose.Schema({
    note:String,
    author:String,
    createdat:String,
    userid:String
},{
    versionKey:false
})

 NoteModel=mongoose.model("notedata",noteSchema)

module.exports={NoteModel}