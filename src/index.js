import express from 'express'
import handlebars from 'express-handlebars'
import routes from './routes.js';
import showRatingHelper from './helper/ratingHelper.js';
import mongoose from 'mongoose';

const app=express();

try{
    const uri='mongodb://localhost:27017/magicMovies'
    await mongoose.connect(uri);

    console.log('DB is conected successfully')

}
catch(err) {
    console.log("Can not connect to DB");
    console.log(err.message)
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers:{
        showRating: showRatingHelper
    }
})); 

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('src/static'));
app.use(express.urlencoded({extended: false}))

app.use(routes)

app.listen(5000, ()=> console.log('Server is listening of http://localhost:5000...'))