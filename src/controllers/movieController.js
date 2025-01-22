import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController=Router()

movieController.get('/search', (req,res) => {
    res.render('search')
})

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId=req.params.movieId;
    const movie=movieService.getOne(movieId)
    console.log(movie)
    res.render('details', {movie});
;
});

movieController.post('/create', (req, res) => {
    const newMovie= req.body;
    movieService.create(newMovie);
    res.redirect('/')
});


export default movieController