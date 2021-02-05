import {useState} from 'react';
import { Badge, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faVideo } from '@fortawesome/free-solid-svg-icons';


function Movie(props) {
    //styles 
    let heart = {}; 
    if (props.isFave === true) {
        heart = {color:'#AB202A'};
    } else if (props.isFave === false) {
        heart = {color: '#000000'} ;
    } 

    // states
    const [watchMovie, countWatchMovie] = useState(0);
    const [myRatingMovie, setMyRating] = useState(0);

    // functions
    let handleLikeClick = () => {
      if (props.isFave === true ) {
        props.onHeartRemoveClick();
      } else {
        props.onHeartAddClick();
      } 
    }

    let handleWatchClick = (state, setState) => {
      setState(state+1);
    }

    let increaseRating = (state, setState) => {
      if (state < 10) {
      setState(state+1);}
    }
    let decreaseRating = (state, setState) => {
      if (state >=1) {
      setState(state-1);}
    }

    let displayStars = (nb) => {
      let stars = [];
      for (let i = 0 ; i < 10 ; i++) {
        let starStyle = { color: '#000000'};
        if (i < nb) { 
          starStyle = { color: '#F8CF2C'}
          } 
        stars.push(<FontAwesomeIcon icon={faStar} style={starStyle} onClick={() => {setMyRating(i+1);}} />);     
      }
      return stars;
    }

    let updateRate = (rate, quantity, newRate) => {
      let updatedMovieRate = Math.round((rate * quantity + newRate) / (quantity+1));
      return updatedMovieRate;
    }

    let displayRating = () => {
      if (myRatingMovie === 0) {
        return (
          <CardText>
            Moyenne: {displayStars(props.globalRating)} ({props.globalCountRating})
          </CardText>
        )
      } else {
        let updatedRate = updateRate(props.globalRating, props.globalCountRating, myRatingMovie);
        return (
          <CardText>
            Moyenne: {displayStars(updatedRate)} ({props.globalCountRating+1})
          </CardText>
        )
      }
    }

    return (
    <div className="col-xs-12 col-lg-6 col-xl-4 my-5">
         <Card>
            <CardImg top width="100%" src={props.movieImg} alt="movie image" />
            <CardBody>
              <CardText>Ajouter aux favoris : <FontAwesomeIcon icon={faHeart} style={heart} onClick={ () => handleLikeClick()} /></CardText>
              <CardText>Nombres de vues : <FontAwesomeIcon icon={faVideo} onClick={ () => handleWatchClick(watchMovie, countWatchMovie)} /> <Badge color="secondary">{watchMovie}</Badge></CardText>
              <CardText>Mon avis: 
                  <span>{displayStars(myRatingMovie)}</span>
                  <Badge color="secondary" onClick={()=>{decreaseRating(myRatingMovie, setMyRating)}}>-1</Badge>
                  <Badge color="secondary" onClick={()=>{increaseRating(myRatingMovie, setMyRating)}}>+1</Badge>
              </CardText>
              {displayRating()}
              <CardTitle tag="h5">{props.movieName}</CardTitle>
              <CardText>{props.movieDesc}</CardText>
            </CardBody>
          </Card>
    </div>
)
}

export default Movie;