import movies from "../movies.js";

const movieService = {
    getOne(movieId){
        const result=movies.find(movieId => movies.id == movieId);
        return result
    }

}

export default movieService