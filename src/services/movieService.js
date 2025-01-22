import movies from "../movies.js";
import {v4 as uuid} from 'uuid'

const movieService = {
    getAll(filter={}) {
        let result=movies;

        if (filter.title) {
            result=result.filter(movie => movie.title.toLowerCase().includes(filter.title.toLowerCase()))
        };

        if (filter.genre) {
            result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase())
        };

        if (filter.year) {
            result = result.filter(movie => Number(movie.year) === Number(filter.year))
        }

        return result
    },
    getOne(movieId){

        // TO DO: if movie is missing?
        const result=movies.find(movie => movie.id == movieId);
        return result
    },
    create(movieData) { 
        const newId=uuid();
        movies.push({
            id: newId,
            ...movieData,
            rating: movieData.rating
        })
        return newId
    }

}

export default movieService