import React from "react";
import PropTypes from "prop-types";
import '../assets/css/cardsGames.css';
function CardsGames({imageGame, title, descripcion, url}){
    return(
        <div className="card-game">
            <a className="card-game-link" href={url}>
                <img className="card-game-img-top" src={imageGame} alt="Card game image cap" />
                <div className="card-game-body">
                    <h5 className="card-game-title">{title}</h5>
                    <p className="card-game-text">{descripcion}</p>
                </div>
            </a>

        </div>
    );
}
CardsGames.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    imageGame: PropTypes.string,
    descripcion: PropTypes.string,
    url: PropTypes.string,
  };
export default CardsGames;