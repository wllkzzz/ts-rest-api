import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "models/User";
import { encryptPass } from "utils/bcrypt.handle";

export const registration = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ "message": "Email and password are required" });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ "message": "User already exists" });
        }

        const hashPassword = await encryptPass(password);

        const userInput = {
            email,
            password: hashPassword,
        };

        const newUser = await createUser(userInput);
        await newUser.save()

        return res.status(201).json({ "message": "User created successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}