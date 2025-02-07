import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
      
        title: {
            type: String,
            required: [true, 'Title is required'],
            minlength: [5, 'Title should be at least 5 characteres long'],
            match: [/^[a-zA-Z0-9 ]+$/, 'The title sould be alphanumeric and with whitespaces'],

        },
        category: String,
        genre: {
            type: String,
            required: [true, 'Genre is required'],
            minlength: [5, 'Genre should be at least 5 characteres long'],
            match: [/^[a-zA-Z0-9 ]+$/, 'The genre sould be alphanumeric and with whitespaces'],

        },
        director:  {
            type: String,
            required: [true, 'Director is required'],
            minlength: [5, 'Director name should be at least 5 characteres long'],
            match: [/^[a-zA-Z0-9 ]+$/, 'The director name sould be alphanumeric and with whitespaces'],

        },
        year:  {
            type: Number,
            min: 1900, 
            max: 2024,
        },
        imageUrl: {
            type: String,
            match: [/^https?:\/\//, 'The image should start with http:// or https://'],
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        description: {
            type: String,
            required: [true, 'The description is required'],
            minlength: [20, 'Description should be at least 20 characters long'],
            match: [/^[a-zA-Z0-9 ]+$/, 'The description sould be alphanumeric and with whitespaces'],
        },
        casts: [{
            type: Types.ObjectId,
            ref: 'Cast'
        }], 
        creator:{
            type: Types.ObjectId,
            ref: 'User'
        },

});

const Movie=model('Movie', movieSchema);

export default Movie;

