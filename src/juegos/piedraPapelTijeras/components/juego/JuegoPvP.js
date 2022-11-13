import React, { useState } from "react";
import OpcionPvP from "./OpcionPvP";
import '../../assets/css/juegoCvC.css'; //Usa el mismo css que JuegoCvC

//Se declaran las variables que guardan los puntajes de los jugadores
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let empates = 0;
//estas variables booleanas sirven para decidir si mostrar o no las elecciones de los jugadores
let eligioPlayer2 = false;//dice si el Jugador2 ya eligió una opción
let eligioPlayer1 = false;//dice si el Jugador1 ya eligió una opción
let primeraVez = true;//nos dice si es la primera ronda.

function JuegoPvP() {
  //Se declaran las variables que guardan las elecciones de cada jugador, ambas son useState
  //en el 1er elemento "eleccionJugador" se guarda el estado, y el 2do "setEleccionJugador" es la funcion que cambia el estado. en useState "" marca el estado inicial
  const [eleccionJugador, setEleccionJugador] = useState({});
  const [eleccionJugador2, setEleccionJugador2] = useState({});
  //Creo un array de objetos con las opciones a elegir y el elemento al cúal derrota dicha eleccion
  //esto sirve para determinar cúal jugador ha ganado
  const opciones = [
    {
      eleccion: "piedra",
      derrota: "tijera",
    },
    {
      eleccion: "papel",
      derrota: "piedra",
    },
    {
      eleccion: "tijera",
      derrota: "papel",
    },
  ];

  //A esta función se le pasa el evento "event" para que se ejecute al hacer click
  const eleccionPlayer1 = (event) => {
    const jugador = opciones.find((e) => e.eleccion === event.target.textContent);//Esto hace que el primer elemento del array cuyo parámetro "elección" sea igual a "textContent" lo devuelve y lo asigna a la variable const Jugador(.find busca en el array)
    setEleccionJugador(jugador);
    eligioPlayer1 = true;
  };

  //Lo mismo que el método anterior pero para el Jugador2
  const eleccionPlayer2 = (event) => {
    const jugador2 = opciones.find((e) => e.eleccion === event.target.textContent);
    setEleccionJugador2(jugador2);
    eligioPlayer2 = true;
  };

  //reinicia las elecciones de los jugadores y los puntajes
  const reiniciarJuego = () => {
    setEleccionJugador("none");
    setEleccionJugador2("none");
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    empates = 0;
    primeraVez = true;
  }

  return (
    <div className="JuegoPvP">
      <Resultado jugador={eleccionJugador} jugador2={eleccionJugador2} />
      <main className="main-cvc">
        <section className="section-cvc">
          <div className="jugador">Jugador 1</div>
          <div className="eleccion">
            <ImgEleccionJugador jugador={eleccionJugador} />{/**esto muestra la imagen que los jugadores eligieron */}
          </div>
        </section>
        <section className="section-cvc">
          <div className="jugador2">Jugador 2</div>
          <div className="eleccion">
            <ImgEleccionJugador2 jugador2={eleccionJugador2} />
          </div>
        </section>
      </main>

      <div className="opciones-jugadores">
        <div className="opc-jug1">
          {opciones.map((e, i) => (//e:es el elemento. i:el índice
            <OpcionPvP key={i} elegir={eleccionPlayer1} valor={e} />
          ))}
        </div>
        <div className="opc-jug2">
          {opciones.map((e, i) => (//e:es el elemento. i:el índice
            <OpcionPvP key={i} elegir={eleccionPlayer2} valor={e} />
          ))}
        </div>
      </div>
      <div className="btn-reinicio"><button className="btn btn-danger" onClick={reiniciarJuego}>Reiniciar</button></div>
      
    </div>
  );
}
export default JuegoPvP;

//Esta función cambia las imagenes que se mostrarán según la elección del jugador 1
const ImgEleccionJugador = (props) => {
  let imagen;//sirve para guardar la imagen que se mostrará

  if (props.jugador.eleccion === "piedra") {
    imagen = "/img/ppt/rock.png";
  } else if (
    props.jugador.eleccion === "papel") {
    imagen = "/img/ppt/paper.png";
  } else if (
    props.jugador.eleccion === "tijera") {
    imagen = "/img/ppt/scissors.png";
  } else {
    imagen = "/img/ppt/none.png"
  }
  //si es la primera vez que se juegue mostrará la imagen por defecto. de no estar este if el cuadro de jugador1 estará vacio
  if (primeraVez) {
    primeraVez = false;//se cambia a false para que no vuelva a entrar por este if
    return (
      <img className="img-ppt"src={[imagen]} alt="none" width={200} height={200} />
    );
  }
  //muestra la imagen de la eleccion del jugador1 si y solo si ambos jugadores ya eligieron una opción
  if (eligioPlayer2 && eligioPlayer1) {
    eligioPlayer2 = false;
    eligioPlayer1 = false;
    return (
      <img className="img-ppt" src={[imagen]} alt="none" width={200} height={200} />
    );
  }
};

//Esta función hace lo mismo que la anterior pero para el jugador 2. Mi idea era usar el método anterior y enviarle como props a la elección del jugador2 pero daba errores y tuve que hacer otra función.
const ImgEleccionJugador2 = (props) => {
  let imagen;

  if (props.jugador2.eleccion === "piedra") {
    imagen = "/img/ppt/rock.png";
  } else if (
    props.jugador2.eleccion === "papel") {
    imagen = "/img/ppt/paper.png";
  } else if (
    props.jugador2.eleccion === "tijera") {
    imagen = "/img/ppt/scissors.png";
  } else {
    imagen = "/img/ppt/none.png";
  }
  //muestra la imagen de la elección del jugador2 si y solo si ambos jugadores no eligieron una opción. Se evalúa de esta manera porque cuando se muestran las imagen del jugador1 se pusieron ambas variables en false.
  if (!eligioPlayer2 && !eligioPlayer1) {
    return (
      <img className="img-ppt" src={[imagen]} alt="none" width={200} height={200} />
    );
  }
};

//Esta función sirve para evaluar quién ganó y aumentar el puntaje del ganador.
const Resultado = (props) => {//recibe como props la elección del jugador 1 y del jugador 2. Ademas recibe el elemento al que derrota dichas elecciones
  let resultadoFinal;//sirve para guardar el mensaje de quien ganó
  if (props.jugador.derrota === props.jugador2.eleccion && props.jugador.eleccion//evalúa que el elemento al que derrota, la eleccion del jugador 1, sea igual a la elección del jugador2. lo que sigue después de && es para verificar que la haya una elección, es decir que no este vacío. Lo mismo en los demás condicionales
  ) {
    //Sólo aumenta el puntaje si ambos jugadores ya escogieron una opción. De no ser así los puntajes no serían correctos
    if (eligioPlayer2 && eligioPlayer1) {
      scorePlayer1++;//aumenta el puntaje del Jugador 1
    }
    resultadoFinal = <p>Ganador: Jugador 1</p>;// se guarda en la variable resultadoFinal el mensaje
  } else if (
    props.jugador2.derrota === props.jugador.eleccion &&
    props.jugador.eleccion
  ) {
    //Sólo aumenta el puntaje si ambos jugadores ya escogieron una opción. De no ser así los puntajes no serían correctos
    if (eligioPlayer2 && eligioPlayer1) {
      scorePlayer2++;//aumenta el puntaje del Jugador 2
    }
    resultadoFinal = <p>Ganador: Jugador 2</p>;
  } else if (
    props.jugador.eleccion === props.jugador2.eleccion &&
    props.jugador.eleccion
  ) {
    empates++;
    resultadoFinal = <p>Empate</p>;
  } else {   //esto sirve para que, al darle en reiniciar, muestre un mensaje vacío.
    resultadoFinal = <p> </p>
  }
  // devuelve o muestra el mensaje y los puntajes de cada jugador
  return (
    <>
      <h1 className="titulo-ppt">{resultadoFinal}</h1>
      <div className="marcador2">
        <p>Puntaje Jugador 1: {scorePlayer1}</p>
        <p>Empates: {empates}</p>
        <p>Puntaje Jugador 2: {scorePlayer2}</p>
      </div>
    </>
  );
};