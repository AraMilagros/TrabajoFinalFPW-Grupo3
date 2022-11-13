import React from "react";
import image1 from "../assets/img/games/game.png";
import image2 from "../assets/img/games/game.png";
import image3 from "../assets/img/games/game.png";
import image4 from "../assets/img/games/game.png";
import image5 from "../assets/img/games/game.png";
import image6 from "../assets/img/games/game.png";
import games from '../assets/json/games.json';
import CardsGames from "../components/CardsGames";

const fotos = [image1, image2, image3, image4, image5, image6];
function JuegosNav(){
    return(
            <div className="container d-flex align-items-center h-100">
                <div className="row">
                    {games.map(({ title, descripcion, url, id }) =>
                    (<div className="col-md-4" key={id}>
                        <CardsGames imageGame={fotos[id - 1]} title={title} descripcion={descripcion} url={url} />
                    </div>))}
                </div>
                <div className="row"></div>
            </div>  
    );
}
export default JuegosNav;