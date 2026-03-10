import Captain from "../models/captain.model.js";

export const createCaptain = async ({ firstName, lastName, email, password, color, plate, vehicleType, capacity }) => {
    if (!firstName || !lastName || !email || !password || !color || !plate || !vehicleType || !capacity) {
        throw new Error("All fields are required");
    }

    const captain = await Captain.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
        vehicles: {
            color,
            plate,
            vehicleType,
            capacity,
        }
    });

    return captain;
};