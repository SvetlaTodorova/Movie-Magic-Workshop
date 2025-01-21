import movies from "../movies.js";

const movieService = {
    getOne(movieId){
        const result=movies.find(movie => movie.id == movieId);
        return result
    }

}

export default movieService