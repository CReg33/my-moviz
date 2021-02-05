const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema({
    movieName: String,
    movieImg: String
}); 
const MoviesModel = mongoose.model('movies', moviesSchema);

module.exports = MoviesModel;