

let notedate=(req,res,next)=>{
    let payload=req.body
    payload.createdat=Date()
    next()

}

module.exports={notedate}