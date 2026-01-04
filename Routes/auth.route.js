import express from "express"
import { authController,checkOtpController,getUserData,refreshAccessToken, } from "../Controllers/auth.controller.js"
import { authCheck } from "../Middleware/authCheck.middleware.js"
import { errorHandler } from "../Utils/globalError.js"
import {asyncHandler} from "../Utils/asyncHandler.js"
import { authorizedRoles } from "../Middleware/authorizedRoles.js"


export const authRoute = express.Router()

authRoute.post("/login",asyncHandler(authController))
authRoute.post("/otp-verify",asyncHandler(checkOtpController))
authRoute.post("/refresh",asyncHandler(refreshAccessToken))
authRoute.get("/user/:userId",asyncHandler(getUserData))

//for testing 
authRoute.get("/test-route", authCheck,authorizedRoles("hr"), async(req,res)=>{
    try{
        res.send("you are authenticated")
    }catch(error){
        throw new errorHandler(500, "internal server error")
    }
}) 


