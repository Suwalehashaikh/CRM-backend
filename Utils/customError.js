export class customError extends
Error{
    constructor (statusCode,message){
        super(message); //call the parent error constructor
        this.statusCode = statusCode //add a custom property
    }
}