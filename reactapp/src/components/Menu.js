import {useState} from 'react';
import {Nav, NavItem, NavLink, Button, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem  } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faHeart, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function Menu(props) {

// styles
let nav = {backgroundColor: '#F8CF2C', color: '#15141A', display:'flex', alignItems:'center'}

// functions
let displayLikedMovie = () => {
    if (props.faveCount === 0) {
        return(<Button size="sm">Cliquez sur  <FontAwesomeIcon icon={faHeart} /> pour ajouter un film</Button>);      
    } else  {
        return (
            <span>
              <Button id="Popover" type="button" size="sm">{props.faveCount} films</Button>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover" toggle={toggle}>
                <PopoverHeader>Favoris</PopoverHeader>
                <PopoverBody>
                    <ListGroup>
                        {props.faveMovieList.map((movie,i) => {
                            return (
                            <ListGroupItem key={i}><img width="20%" src={movie.movieImg} alt={movie.movieName} /> 
                                {movie.movieName}   <FontAwesomeIcon icon={faTimesCircle} onClick={()=> {props.removeMovie(movie.movieName)}} /> 
                            </ListGroupItem>)})}
                    </ListGroup>
                </PopoverBody>
             </Popover>
           </span>

        );
    }
}

// POPOVER with list of liked/favorite movies
const [popoverOpen, setPopoverOpen] = useState(false);
const toggle = () => setPopoverOpen(!popoverOpen);


    return (
    <Nav style={nav}>
        <NavItem>
            <NavLink style={nav} className="menu-link" href="#"><FontAwesomeIcon icon={faTicketAlt} /></NavLink>
        </NavItem>
        <NavItem>
            <NavLink style={nav} className="menu-link" href="#">Dernières sorties</NavLink>
        </NavItem>
        <NavItem>
            <NavLink style={nav} className="menu-link" href="#">Favoris {displayLikedMovie()}</NavLink>
        </NavItem>
    </Nav>
)}

export default Menu;