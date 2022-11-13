import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/Home';
import Config from '../phaser/Config';
import Desarrolladores from '../pages/Desarrolladores';
import ErrorPage from '../pages/ErrorPage';

import '../assets/css/Header.css';
import Juegos from './Juegos';

export default function Header() {
    return (
        <div className="header-contenedor">
            <nav className='nav-home'>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/juegos">Juegos</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="/phaser">phase</a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" href="/nosotros">Desarrolladores</a>
                    </li>
                </ul>
            </nav>

            <div>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/juegos/*" element={<Juegos/>} />
                        {/* <Route path="/phaser" element={<Config/>} /> */}
                        {/* <Route path="react" element={<JuegoReact/>}/>  */}
                        <Route path="/nosotros" element={<Desarrolladores />} />
                        <Route path="/*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>

        </div>
    );
}