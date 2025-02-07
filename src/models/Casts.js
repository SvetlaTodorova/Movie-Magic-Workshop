import { Schema, model } from "mongoose";

const castSchema= new Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        minLength: [5, 'Name should be at least characters long'],
        match: [/^[a-zA-Z0-9 ]+$/, 'The name should alphanumeric with whitespaces'],
    },
    age: {
        type: Number,
        min: 1, 
        max: 120,
    },
    born: {
        type: String,
        match: [/^[a-zA-Z0-9 ]+$/, 'The born place should alphanumeric with whitespaces'],

    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'The image should start with http:// or https://'],
    },
});

const Cast= new model('Cast', castSchema);

export default Cast
