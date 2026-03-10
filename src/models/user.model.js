import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    fullName:{
        firstName: {
            type:String,
            required:true,
            minlength:[3,"first name must be at least 3 characters long"]
        },
        lastName: {
            type:String,
            required:false,
        }


   },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"password must be at least 6 characters long"],
        select:false
    },
    socketId:{
        type:String,


    }
    
});
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"});
    return token;

}
userSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);

}
userSchema.statics.hashPassword= async function(password){
    return await bcrypt.hash(password,10);

};
    

const User = mongoose.model("User", userSchema);
export default User;