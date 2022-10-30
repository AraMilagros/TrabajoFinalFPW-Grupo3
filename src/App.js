import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Config from './phaser/Config';

function App() {
    return (
        <>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/phaser">Juego Phaser</Link>
                        </li>
                        <li>
                            <Link to="/react">Juego React</Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="phaser" element={<Config />} />
                        <Route path="react"/> {/* Aqui iria el juego hecho solo con react */}
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}
export default App;

function About() {
    return (
        <div>
            <h2>About Page</h2>
        </div>
    );
};

function Home() {
    return (
        <div>
            <h2>Home Page</h2>
        </div>
    );
};

function ErrorPage() {
    return (
        <div>
            <h2>Error Page</h2>
        </div>
    );
};
