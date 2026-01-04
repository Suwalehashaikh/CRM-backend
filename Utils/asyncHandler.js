export const asyncHandler = (fn) => async(req,res, next)=>{
    try{
        await fn(req,res, next);
    }catch(error){
        //centralized error handling logic
        console.error("Async handler caught on error:",error.message)
        //pass the error to the express error handling middleware 
        next(error)
    }
}