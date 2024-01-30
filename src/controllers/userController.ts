import express from "express";
import bcrypt from "bcrypt";
import { getUserByEmail, getUserById, getUsers, createUser, deleteUserById, updateUserById } from "../models/User";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}

export const getUserId = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ "message": "User not found" });
        }

        return res.status(200).json({
            id: user._id,
            email: user.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}

export const getUserEmail = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.params;

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ "message": "User not found" });
        }

        return res.status(200).json({
            id: user._id,
            email: user.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}

export const createNewUser = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ "message": "Email and password are required" });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ "message": "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10); // Use a higher salt rounds value

        const userInput = {
            email,
            password: hashPassword,
        };

        const newUser = await createUser(userInput);
        await newUser.save()

        return res.status(201).json({ "message": "User created successfully", newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        if (!deletedUser) {
            return res.status(404).json({ "message": "User not found" });
        }

        return res.status(200).json({ "message": "User deleted successfully", deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ "message": "Email is required for updating user" });
        }

        const updatedUser = await updateUserById(id, { email });

        if (!updatedUser) {
            return res.status(404).json({ "message": "User not found" });
        }

        return res.status(200).json({ "message": "User updated successfully", updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}
