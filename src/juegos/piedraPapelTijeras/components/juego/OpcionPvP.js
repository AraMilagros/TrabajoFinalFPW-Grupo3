import React from "react";

const OpcionPvP = (props) => {
    //devuelve un div con 3 botones, son tres botones porque button recibe como props
    //el elemento del array con la elección y el objeto al que derrota, poniendose de nombre la elección
    //En button el evento onClick llama al método eleccionPlayer correspondiente, el cuál recibe como props
  return (
    <div>
     <button className="btn btn-info" onClick={props.elegir}>{props.valor.eleccion}</button>
    </div>
  );
};

export default OpcionPvP;