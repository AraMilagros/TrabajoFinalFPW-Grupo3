import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/Home';
import Config from '../phaser/Config';
import Desarrolladores from '../pages/Desarrolladores';
import ErrorPage from '../pages/ErrorPage';

import '../assets/css/Header.css';
import JuegoReact from '../react/JuegoReact';
export default function Header() {
    return (
        <div className="header-contenedor">
            <nav>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="phaser">Juego Phaser</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="react">Juego React</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="nosotros">Desarrolladores</a>
                    </li>
                </ul>
            </nav>

            <div>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="phaser" element={<Config />} />
                        <Route path="react" element={<JuegoReact/>}/> {/* Aqui iria el juego hecho solo con react - solo se puso ErrorPage para ejemplo */}
                        <Route path="nosotros" element={<Desarrolladores />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>

        </div>
    );
}