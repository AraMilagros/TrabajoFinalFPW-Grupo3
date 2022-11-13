import React from 'react';
import '../assets/css/Home.css';
import phaser from '../assets/img/phaser3.png';
import reactjs from '../assets/img/reactjs.png';

export default function Home() {
    return (
        <>
            <div className="contenedor-home">
                <div className="titulo-home">
                    <h3>FUNDAMENTOS DE PROGRAMACIÓN WEB</h3>
                    <h3>TRABAJO FINAL</h3>
                    <h3>GRUPO 3</h3>
                </div>

                <div className="juegos">
                    <div className="titulo-phaser">
                        <img src={phaser} className="img-home"></img>
                        <div className="descripcion">
                            <h4>Juego con Phaser 3</h4>
                            <h5>JUMPECT</h5>
                            <p>
                                El jugador debera saltar hasta la meta acumulando puntajes antes de que el tiempo se termine
                            </p>
                        </div>
                        <a href="juegos/Jumpect" className="btn btn-dark p-3">Jugar ahora</a>
                    </div>

                    <div className="titulo-reacthome">
                        <img src={reactjs} className="img-home"></img>
                        <div className="descripcion">
                            <h4>Juego con ReactJS</h4>
                            <h5>SLIME RACE</h5>
                            <p>
                                Juego de dos jugadores, donde cada uno responderá preguntas para poder alcanzar la meta
                            </p>
                        </div>
                        <a href="juegos/SlimeRace" className="btn btn-dark p-3">Jugar ahora</a>
                    </div>
                </div>
            </div>
        </>

    );
}