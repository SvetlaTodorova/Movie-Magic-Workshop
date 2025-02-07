import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [, 'Incorrect email format'],
        minlength: [20, 'Email should be at least 20 characters']
    
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'The password should be at least 6 characters long'],
        match: [/^\w+$/, 'The password is not in the expected pattern']

    },
});

const User = new model('user', userSchema);

export default User