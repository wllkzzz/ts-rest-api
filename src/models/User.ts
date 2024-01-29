import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true, trim: true, lowercase: true},
    password: {type: String, require: true, trim: true},
})

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const createUser = (values: Record<string, any>) => new UserModel(values);
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);