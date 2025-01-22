import movies from "../movies.js";
import {v4 as uuid} from 'uuid'

const movieService = {
    getAll(filter={}) {
        let result=movies;

        if (filter.search) {
            result=result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()))
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