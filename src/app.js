import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routers/user.router.js"; 

import connectDb from "./config/db.config.js";


dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/" , (req,res)=>{
    res.send("Hello World");
})

app.use("/api/v1/users", userRoutes);

export default app;