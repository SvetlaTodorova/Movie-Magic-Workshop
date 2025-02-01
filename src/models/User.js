import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: String,
    password: String,
});

const User = new model('user', userSchema);

export default User