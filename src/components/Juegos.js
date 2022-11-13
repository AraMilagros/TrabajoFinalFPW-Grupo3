import React from "react";
import {Routes, Route, Link  } from "react-router-dom";
import Config from "../phaser/Config";
import SlimeRace from "../juegos/slimeRace/SlimeRace";
import JuegosNav from "../pages/JuegosNav";
import Ahorcadito from "../juegos/ahorcadito/Ahorcadito";
import Ppt from "../juegos/piedraPapelTijeras/Ppt";
import Arkanoid from "../juegos/arkanoid/Arkanoid";
import Dude from "../juegos/dude/Dude";


function Juegos(){
    return(
        <>
            {/* <nav>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/juegos/Jumpect">Jumpect</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/juegos/SlimeRace">Slime Race</a>
                    </li>
        
                </ul>
            </nav> */}
            <Routes>
                <Route path="/" element={<JuegosNav/>}/>
                <Route path="Jumpect" element={<Config/>} />
                <Route path="SlimeRace" element={<SlimeRace/>} />
                <Route path="Ahorcadito" element={<Ahorcadito/>} />
                <Route path="ppt" element={<Ppt/>} />
                <Route path="Arkanoid" element={<Arkanoid/>} />
                <Route path="Dude" element={<Dude/>} />
            </Routes>
        </>
    );
}

export default Juegos;