import jwt from "jsonwebtoken"
import { customError } from "../Utils/customError.js"
export const authCheck = async(req,res,next)=>{
    try{
        const accessToken = req.headers.authorization.split("")[1]
        if(!accessToken){
            throw new customError(401, "token not found")
        }
        const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET_KEY )
        if(!decoded){
                req.user = decoded
                next()
            }
    }catch(error){
    throw new customError(403, error.message)
    }
}