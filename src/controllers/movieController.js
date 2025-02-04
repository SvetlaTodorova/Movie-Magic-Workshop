import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middleware/authMiddleware.js";

const movieController=Router()

movieController.get('/search', async (req,res) => {
    const filter=req.query;
    const movies=await movieService.getAll(filter);
    res.render('search', { movies, filter })
})

movieController.get('/create', isAuth, (req, res) => {
    res.render('create');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId=req.params.movieId;
    const movie=await movieService.getOne(movieId)
    const isCreator = movie.creator && movie.creator.toString() === req.user?.id
    
    res.render('movie/details', {movie, isCreator});
   
;
});

movieController.post('/create',isAuth, async (req, res) => {
    const newMovie= req.body;
    const userId=req.user?.id;
   
    await movieService.create(newMovie, userId);
    res.redirect('/')
});

movieController.get('/:movieId/attach-cast', async (req, res) => {

    const movieId=req.params.movieId;
    const movie= await movieService.getOne(movieId);
    const casts= await castService.getAll()


    res.render('movie/attach-cast', { movie, casts })
});

movieController.post('/:movieId/attach-cast', isAuth, async (req, res) => {
    const movieId=req.params.movieId;
    const castId=req.body.cast;

    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`)

});

movieController.get('/:movieId/delete', isAuth,(req, res) => {
    const movieId=req.params.movieId;
    console.log(movieId)

    movieService.delete(movieId);
    res.redirect('/')


});

movieController.get('/:movieId/edit', isAuth,async (req,res) => {
    const movieId=req.params.movieId;
    const movie=await movieService.getOne(movieId);

    const categories= getCategoriesViewData(movie.category);

    res.render('movie/edit', {movie, categories})
});

movieController.post('/:movieId/edit', isAuth, async (req,res) =>{
    const movieData=req.body;
    const movieId=req.params.movieId;
    
    await movieService.update(movieId, movieData);
    
    res.redirect(`/movies/${movieId}/details`)
})

function getCategoriesViewData(category) {
    const categoriesMap = {
        'tv-show' : 'TV Show',
        'animation' : 'Animation',
        'movie' : 'Movie',    
        'documentary' : 'Documentary',
        'short-film' : 'Short Film',
    }

    const categories = Object.keys(categoriesMap).map(value => ({
        value, 
        label: categoriesMap[value],
        selected: value === category.toLowerCase() ? 'selected' : ''
    }))
    return categories
}




export default movieController