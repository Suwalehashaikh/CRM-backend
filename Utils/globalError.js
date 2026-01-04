export const errorHandler = (err, req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server error"


    res.status(err.statusCode).json({status:"Fail",message: err.message})
}