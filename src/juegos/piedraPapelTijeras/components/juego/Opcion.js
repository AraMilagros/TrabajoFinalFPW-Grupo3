import React from "react";

const Opcion = (props) => {
    
    //Este retun se usa para el caso de Computadora vs Computadora
    //devuelve un div con 2 botones, el 1ro ejecuta el método IniciarJuego que recibe como parámetro
    //el 2do ejecuta el método reiniciarJuego que también recibe como parámetro
    return(
        <div className="opcion">
            <button className="btn btn-danger" onClick={props.jugar}>Jugar</button>
            <button className="btn btn-info" onClick={props.reiniciar}>Reiniciar</button>
        </div>
    );
};

export default Opcion;