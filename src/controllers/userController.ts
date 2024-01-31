import express from "express";
import bcrypt from "bcrypt";
import { getUserByEmail, getUserById, getUsers, deleteUserById, updateUserById } from "../models/User";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        const safeResponse = users.map(user => ({
            id: user._id,
            email: user.email
        }));

        return res.status(200).json(safeResponse);
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


export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        if (!deletedUser) {
            return res.status(404).json({ "message": "User not found" });
        }

        return res.status(200).json({ "message": "User deleted successfully"});
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

        return res.status(200).json({ "message": "User updated successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}
