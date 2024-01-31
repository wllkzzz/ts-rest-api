import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../models/User";
import { encryptPass, verifyPass } from "../utils/bcrypt.handle";
import { generateJwt } from "../utils/jwt.handle";

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

        const token = await generateJwt(newUser.email)

        return res.status(201).json({ "message": "User created successfully", "token": token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}

export const login = async (req: express.Request, res: express.Response) => {
   try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ "message": "Email and password are required" });
    }
    
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return res.status(400).json({ "message": "User doesn't exist" });
    }

    const hashPassword = existingUser.password;

    const checkPass = await verifyPass(password, hashPassword);

    if(checkPass) {
        const token = await generateJwt(existingUser.email);
        return res.status(201).json(token)
    } else {
        return res.status(400).json({ "message": "Try again" });
    }
   } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
   }
}