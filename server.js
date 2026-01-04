import express from "express";
import dotenv from "dotenv";
import dbConnect from './Database/dbConnect.js';
import {adminRoute} from './Routes/admin.route.js'
import {counsellorRoute} from './Routes/counsellor.routes.js'
import {hrRoute} from './Routes/hr.routes.js'
import { authRoute } from "./Routes/auth.route.js";
import { errorHandler } from "./Utils/globalError.js";
import cookieParser from "cookie-parser"
import requestLogger from "./Middleware/requestLogger.js";
import cors from "cors";
import limiter from "./Middleware/limiter.js"
import Student from "./Models/students.schema.js";




dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

//database
dbConnect()

//cors configuration
app.use(cors({
  origin: "http://localhost:5173",//frontend URL
  methods: ["GET", "POST","PUT", "DELETE", "PATCH"],
  credentials:true,//allow cookies /auth headers
}))


// json body parser
app.use(express.json()); 
//cookie parser
app.use(cookieParser())  
//winston log middleware
app.use(requestLogger)
//rate limits for api's
app.use(limiter);   // NOT limiter()

app.get("/",async(req,res)=>{
  res.send("server is running")
})
//routes
app.use('/api/admin', adminRoute)
app.use('/api/counsellor', counsellorRoute)
app.use('/api/hr', hrRoute)
app.use('/api', authRoute)

//test api for collections
app.post("/addStudent/:userId", async(req,res)=>{
  try{
  const {userId}= req.params
  const{name,email,phone}= req.body

  if(!userId){
    return res.status(400).json({status:"fail",message:"np user or student id"})
  }
  if(!name || !email ||!phone){
    return res.status(400).json({status:"fail",message:"no user or student id"})
  }
  const user = await Employee.findById(userId);
  const student = await Student.create({name,email,phone});
if(!user){
  return res.status(404).json({status:"fail",message:"user not found"})
}
student.counsellorDetail = user._id 
await user.students.push(student._id);
user.save()
student.save()
return res.status(201).json({status:"success",message:"student created sucessfully"})
  }catch(error){
console.log(error.message)
  }
})




//file upload -test api
import { upload } from "./Utils/multer.js";
import { Employee } from "./Models/employee.schema.js";
app.post('/profile', upload.single('profile'), function (req, res) {
  console.log(req.file)
  res.json({message:"image uploaded successfully"})
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
//global error handler function
app.use(errorHandler)

app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`)
})
