import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController=Router()

movieController.get('/search', async (req,res) => {
    const filter=req.query;
    const movies=await movieService.getAll(filter);
    res.render('search', { movies, filter })
})

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId=req.params.movieId;
    const movie=await movieService.getOne(movieId)
    res.render('movie/details', {movie});
   
;
});

movieController.post('/create', async (req, res) => {
    const newMovie= req.body;
    await movieService.create(newMovie);
    res.redirect('/')
});

movieController.get('/:movieId/attach-cast', async (req, res) => {

    const movieId=req.params.movieId;
    const movie= await movieService.getOne(movieId);
    const casts= await castService.getAll()


    res.render('movie/attach-cast', { movie, casts })
});

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const movieId=req.params.movieId;
    const castId=req.body.cast;

    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`)

})


export default movieController