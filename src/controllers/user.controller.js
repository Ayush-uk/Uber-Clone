import  {validationResult } from "express-validator";
import User from "../models/user.model.js";
import { createUser } from "../services/user.services.js";

export const registerUser = async (req , res )=>{
    try {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
        }
        const {fullName , email, password} = req.body;

        const isUserAlreadyExist = await User.findOne({email});
        if(isUserAlreadyExist){
            return res.status(400).json({
              error:"user already exists"
            })
        }
        const hashedPassword = await User.hashPassword(password);

        const user = await createUser({
            
                firstName:fullName.firstName,
                lastName:fullName.lastName,
                email,
                password:hashedPassword

        })
        const token = user.generateAuthToken();
        res.status(201).json({

            message:"user registered successfully",
            user,
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}
export const loginUser = async (req , res )=>{
    try {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()});
        }
        const {email, password} = req.body;
        const user = await User.findOne({email}).select("+password");
        
        if(!user){
            return res.status(400).json({error:"invalid email or password"});
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({error:"invalid email or password"});
        }
        const token = user.generateAuthToken();
        res.status(200).json({
            message:"login successful",
            token :token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
export const getUserProfile = async (req , res  )=>{
    res.status(200).json({
        user: req.user
    });

}
export const logoutUser = async (req , res )=>{
    res.clearCookie("token");
    res.status(200).json({message:"logout successful"});


}