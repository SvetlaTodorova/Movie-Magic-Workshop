import movies from "../movies.js";
import {v4 as uuid} from 'uuid'

const movieService = {
    getAll() {
        return movies
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
            ...movieData
        })
        return newId
    }

}

export default movieService