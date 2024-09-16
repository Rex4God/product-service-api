import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegex, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>("User", UserSchema);
