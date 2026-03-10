import {body} from "express-validator";

export const userValidator = [
    body("fullName.firstName").notEmpty().withMessage("first name is required"),
    body("email").isEmail().withMessage("please provide a valid email address"),
    body("password").isLength({min:6}).withMessage("password must be at least 6 characters long")
]

export const loginValidator = [
    body("email").isEmail().withMessage("please provide a valid email address"),
    body("password").isLength({min:6}).withMessage("password must be at least 6 characters long")
]
