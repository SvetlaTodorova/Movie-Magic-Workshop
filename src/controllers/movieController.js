import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController=Router()

movieController.get('/search', (req,res) => {
    const filter=req.query;
    const movies=movieService.getAll(filter);
    console.log(movies)
    res.render('search', { movies, filter })
})

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId=req.params.movieId;
    const movie=await movieService.getOne(movieId)
    res.render('details', {movie});
;
});

movieController.post('/create', (req, res) => {
    const newMovie= req.body;
    movieService.create(newMovie);
    res.redirect('/')
});


export default movieController