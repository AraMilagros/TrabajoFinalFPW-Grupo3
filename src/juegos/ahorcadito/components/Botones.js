import "../../ahorcadito/assets/css/styleA.css";
import React from "react";

const Botones = (props) => {
    //Por cada elemento que recibe de abecedario.json retorna un botón.
    return (
        <div className="contenedor">
        <button className="botonesB" disabled={props.deshabilitar} onClick={props.elegir} >{props.valor}</button>
        </div>
      );
}

export default Botones;
