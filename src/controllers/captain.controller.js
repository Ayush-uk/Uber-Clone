import express from "express";
import { validationResult } from "express-validator";
import Captain from "../models/captain.model.js";
import { createCaptain } from "../services/captain.services.js";

export const registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password, vehicles } = req.body;
        const isCaptainExist = await Captain.findOne({ email });
        if (isCaptainExist) {
            return res.status(400).json({ error: "Captain already exists" });
        }

        const hashedPassword = await Captain.hashPassword(password);
        const captain = await createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
            color: vehicles.color,
            plate: vehicles.plate,
            capacity: vehicles.capacity,
            vehicleType: vehicles.vehicleType,
        });

        const token = captain.generateAuthToken();
        res.cookie("token", token);
        captain.password = undefined; // Exclude password from response
        res.status(201).json({ message: "Captain registered successfully", token, captain });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const captain = await Captain.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await captain.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = captain.generateAuthToken();
        res.cookie("token", token);
        captain.password = undefined;
        res.status(200).json({ message: "Captain logged in successfully", token, captain });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCaptainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain });
};

export const logoutCaptain = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};
