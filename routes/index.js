const express = require('express');
const router = express.Router();
const request = require('sync-request');
const MoviesModel = require('../models/movies');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET new movies from API */
let language = "&language=fr-FR";
let sort = "&sort_by=popularity.desc";
let myAPIkey = "api_key=3477c8d05abd17ec04c0970f09f69cda";
let url = "https://api.themoviedb.org/3/discover/movie?"+myAPIkey+sort+language;
router.get('/new-movies', function(req, res, next) {
  let data = request('GET', url);
  let dataResponse = JSON.parse(data.getBody());
  res.json(dataResponse.results);
})

/* POST add a movie to wishlist / favorites */
router.post('/wishlist-movies', async function(req, res, next) {
  let movie = new MoviesModel({
    movieName: req.body.movieName,
    movieImg: req.body.movieImg
  });
  let movieSave = await movie.save();
  res.json({movieSave, result:true});
})

/* DELETE a movie from wishlist / favorites */
router.post('/wishlist-movie', async function(req, res, next) {
  await MoviesModel.deleteOne({movieName: req.body.name});
  res.json({result:true});
})

/* GET all movies in database */
router.get('/wishlist-movie', async function(req, res, next) {
  let data = await MoviesModel.find();
  res.json(data);
})

module.exports = router;
