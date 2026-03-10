import { body } from "express-validator";

export const registerValidator = [
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicles.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicles.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicles.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicles.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
];

export const loginValidator = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];