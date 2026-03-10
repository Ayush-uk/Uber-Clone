import express from "express";
import { registerValidator ,loginValidator} from "../validator/captain.validator.js";
import { loginCaptain, registerCaptain ,getCaptainProfile,logoutCaptain} from "../controllers/captain.controller.js";
import { authCaptain } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register",registerValidator , registerCaptain)
router.post("/login", loginValidator ,loginCaptain) 
router.get("/profile",authCaptain,getCaptainProfile)
router.get("/logout", authCaptain, logoutCaptain)

export default router;