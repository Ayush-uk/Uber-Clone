import Captain from "../models/captain.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const authUser = async (req , res , next)=>{

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({error:"access denied , no token provided"});
    }
    try {
        const decoded = jwt.verify(token ,process.env.JWT_SECRET);
        console.log(decoded);

        const user = await User.findById(decoded.id);
        req.user = user;
        return next();

    } catch (error) {
        res.status(400).json({error:"invalid token"}); 

    }



}
export const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await Captain.findById(decoded.id);  // Changed to decoded.id

        req.captain = captain;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};