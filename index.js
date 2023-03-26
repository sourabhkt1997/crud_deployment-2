
let express=require("express")
let app=express()
require("dotenv").config()
let {connection}=require("./db")
let {userrouts}=require("./routs/user.routs")
let {noterouts}=require("./routs/note.routes")
let {auth}=require("./middleware/authmiddleware")
let swaggerjSdoc=require("swagger-jsdoc")
let swaggerUi=require("swagger-ui-express")
cors=require("cors")
app.use(express.json())
app.use(cors())

app.use("/user",userrouts)
app.use(auth)
app.use("/note",noterouts)

// //swagger definition
// let options={
//     definition:{
//         openapi:"3.0.0",
//         info:{
//             title:"my first swagger",
//             version:"1.0.0"
//         },
//         servers:[
//             {
//                 url:"http://localhost:8500"
//             }
//         ]
//     },
//     apis:["./routs/*.js"]
// }
// //swagger specification
// let swaggerSpec=swaggerjSdoc(options)
// //building the ui
// app.use("/documentations",swaggerUi.serve,swaggerUi.setup(swaggerSpec))




app.listen(process.env.port,async()=>{
    try{
       await connection
       console.log(`server is running in port ${process.env.port}`)
    }
    catch(err){
        console.log("not able to connect")
    }
})