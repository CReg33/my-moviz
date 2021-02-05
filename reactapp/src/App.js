import './App.css';
import {Container, Row  } from 'reactstrap';
import Menu from './components/Menu';
import Movie from './components/Movie';
import { useState, useEffect } from 'react';

function App() {

// styles
let background = {backgroundColor:'#15141A'};

// states
const [faveCount, setFaveCount] = useState(0);
const [faveMovieList, setFaveMovieList] = useState([]);
const [moviesList, setMoviesList] = useState([]);

// Load Data
useEffect(() => {
  // Load movie data
  let loadData = async () => {
    let rawResponse = await fetch('/new-movies');
    let dataResponse = await rawResponse.json();
    console.log(dataResponse);
    setMoviesList(dataResponse);
  }
  // Load movie wishlist / favorites
  let loadFaves = async () => {
    let rawResponse = await fetch('/wishlist-movie');
    let faveResponse = await rawResponse.json();
    setFaveMovieList(faveResponse);
    setFaveCount(faveResponse.length);
  }
  loadData();
  loadFaves();
}, []);

// Functions
// Add to Favorites & remove from favorites on Heart icon (Movie)
let handleClickAddFaveMovie = async (movieName, movieImg) => {
  await fetch('/wishlist-movies', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: 'movieName=' + movieName + '&movieImg=' + movieImg
  }) 
  setFaveCount(faveCount+1);
  setFaveMovieList([...faveMovieList, {movieName:movieName, movieImg:movieImg}]);
}
let handleClickRemoveFaveMovie = async (movieName) => {
  await fetch('wishlist-movie', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: 'name=' + movieName
  });
  setFaveCount(faveCount-1);
  setFaveMovieList(faveMovieList.filter( (movie) => (movie.movieName !== movieName) ));
}

let displayMovieData = moviesList.map((movie,i) => { 

  let findMovie = faveMovieList.find(film => (film.movieName === movie.title));
  let isFave = false;
  if (findMovie !== undefined) {
    isFave = true;
  }

  let movieUrl = '../public/img/placeholder.jpg';
  if (movie.backdrop_path !== null) {
    movieUrl = 'https://image.tmdb.org/t/p/w500/'+movie.backdrop_path;
  }
  let movieDesc = movie.overview;
  if (movie.overview.length > 80) {
    movieDesc = movie.overview.substring(0,80) + "..."
  }

  return <Movie key={i}
                movieName={movie.title} 
                movieDesc={movieDesc} 
                movieImg={movieUrl}
                globalRating={movie.vote_average} 
                globalCountRating={movie.vote_count} 
                isFave={isFave}
                onHeartAddClick={()=> {handleClickAddFaveMovie(movie.title, movieUrl)}}
                onHeartRemoveClick={()=> {handleClickRemoveFaveMovie(movie.title)}}
          />});

        

  return (
    <div className="App" style={background}>
      <Container>
        <Menu faveCount={faveCount} faveMovieList={faveMovieList} removeMovie={handleClickRemoveFaveMovie} />
        <Row>
          {displayMovieData}
        </Row>
      </Container>
    </div>
  );
}

export default App;
