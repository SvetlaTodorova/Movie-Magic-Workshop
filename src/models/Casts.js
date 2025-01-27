import { Schema, model } from "mongoose";

const castSchema= new Schema({
    name: String,
    age: Number,
    born: String,
    imageUrl: String,
});

const Cast= new model('Cast', castSchema);

export default Cast
