import  mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const captainSchema = new mongoose.Schema({
    fullName:{
        firstName: {
            type:String,
            required:true,
        },
        lastName: {
            type:String,
            required:false,
        },

    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"please provide a valid email address"]
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"password must be at least 6 characters long"]

    },
    soketId:{
        type:String,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"

    },
    vehicles:{
        color:{ 
            type:String,
            required:true,
            minlength:[3,"color must be at least 3 characters long"]
        },
        plate:{
            type:String,
            required:true,
            unique:true,
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,"capacity must be at least 1"],
        },
        vehicleType:{
            type:String,
            enum:["car","motorcycle","auto"]

        }
    },
    location:{
        ltd:{type:Number},
        lng:{type:Number}
    }

});
captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"});
    return token;

}
captainSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);

}
captainSchema.statics.hashPassword= async function(password){
    return await bcrypt.hash(password,10);

};


const Captain = mongoose.model("Captain", captainSchema);
export default Captain;




