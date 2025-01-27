

import Movie from '../models/Movies.js';

const movieService = {
       getAll(filter={}) {
         let result= Movie.find({});

         //TODO to make it case insensitive
        
        if (filter.search) {
            result=result.find({title: filter.search})
        };

        if (filter.genre) {
            result=result.find({genre: filter.genre})
        };

        if (filter.year) {
            result = result.find({year: Number(filter.year)})
        } 

        return result
    },
    getOne(movieId){

        // TO DO: if movie is missing?
        const result=Movie.findById(movieId);
        return result
    },
    create(movieData) { 
        const result= Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year)
        })
        return result
    }

}

export default movieService