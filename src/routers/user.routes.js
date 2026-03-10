import express from "express";
import { loginValidator, userValidator } from "../validator/user.validator.js";
import { registerUser ,loginUser,logoutUser,getUserProfile } from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";


const router = express.Router();
router.post("/register",userValidator , registerUser);
router.post("/login", loginValidator, loginUser);
router.get("/profile", authUser, getUserProfile);
router.get("/logout", authUser, logoutUser);

export default router;