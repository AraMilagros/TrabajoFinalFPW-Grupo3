import React, { useEffect, useState } from 'react';
// import ReactHowler from 'react-howler';
//se importan los componentes necesarios
import PistaCarrera from './components/PistaCarrera';
import {PISTA,PISTA2} from'./components/Constante';
import VentanaModalPregunta from './components/VentanaModalPregunta';
import VentanaModalResultado from './components/VentanaModalResultado';
import VentanaModalCambioTurno from './components/VentanaModalCambioTurno';
import preguntas from './assets/json/preguntas.json';

import './assets/css/juegoReact.css';
//se importan una imagen y sonidos necesarios
import Imagen from './components/Imagen';
import win from './assets/sound/win.wav';
import jump from './assets/sound/jump.mp3';
import correct from './assets/sound/respuestaCorrecta.mp3';
import incorrect from './assets/sound/respuestaIncorrecta.mp3';
import botonAll from './assets/sound/botonAll.mp3';

//función principal del juego hecho con react
function SlimeRace(){
    //VARIABLES DE BLOQUE CONST
    //variables que sirven para abrir y cerrar las ventanas modales
    const[modalShow, setModalShow] = useState(false);
    const[modalShowResultado, setModalShowResultado] = useState(false);
    const[modalShowCambio, setModalShowCambio] = useState(false);
    const[ganador, setGanador]=useState("");        //variable que guarda al jugador ganador
    const[pregunta, setPregunta]=useState("");      //guarda una pregunta al azar
    const[falsa, setFalsa] = useState("");          //guarda la respuesta falsa
    const[verdadera, setVerdadera] = useState("");  //guarda la respuesta verdadera
    const[orden, setOrden] = useState(0);           //se utiliza para cambiar el orden de las respuestas en la ventana modal
    const[disabledBtnDado, setDisabledBtnDado] = useState(false);   //se usa para habilitar y deshabilitar el botón que lanza el dado
    const[disabledBtnAvanzar, setDisabledBtnAvanzar] = useState(true);//se usa para habilitar y deshabilitar el botón avanzar
    const[respuesta, setRespuesta] = useState(true);    //guarda la respuesta del jugador
    const[turno, setTurno] = useState("Player 1");      //sirve para saber quién es el turno
    const [valorDado,setValorDado]=useState(0);             //guarda el valor del dado cada vez que se lo lanza
    const [valorDadoTotal,setValorDadoTotal]=useState(0);   //acumula la suma de los valores de los dados que le tocó al jugador1
    const [contadorPasos,setContadorPasos]=useState(1);     //cuenta lo que va avanzando el jugador 1
    const [pistaArray,setPistaArray]=useState(PISTA);       //guarda un array que corresponde a la pista que puede recorrer el jugador1
    const [valorDadoTotalJ2,setValorDadoTotalJ2]=useState(0);       //acumula la suma de los valores de los dados que le tocó al jugador 2
    const [contadorPasosJ2,setContadorPasosJ2]=useState(1);         //cuenta lo que va avanzando el jugador 2
    const [pistaArrayPlayer2,setPistaArrayPlayer2]=useState(PISTA2);//guarda un array que corresponde a la pista que puede recorrer el jugador 2
    //se usa el useEffect para reproducier un audio cuando un jugador gana
    useEffect(()=>{
        if (ganador !== "") {
            new Audio(win).play();
        }
    })
    //Función que elige un valor random entre 1-6 para el valor del dado
    const tirarDado=()=>{
        new Audio(botonAll).play();
        let valorRandon=Math.ceil(Math.random()*6)
        setValorDado(valorRandon);                  //le da al dado el valor random obtenido en la linea anterior
        if (turno === "Player 1") {                 //este if sirve para saber de quién es el turno
            let auxiliar=valorDadoTotal;            //se guarda en un auxiliar el valorDadoTotal actual del Jugador 1
            auxiliar+=valorRandon;
            if (auxiliar<=14) {                                 //si el auxiliar no pasa el maximo tamaño de la pista,
                setValorDadoTotal(valorRandon+valorDadoTotal);  //se acumula el valor dado total
                prueba();       //se llama a la funcion prueba
            }
        }else{                      //lo mismo pero para el Jugador 2
            let auxiliar=valorDadoTotalJ2;
            
            auxiliar+=valorRandon;
            if (auxiliar<=14) {
                setValorDadoTotalJ2(valorRandon+valorDadoTotalJ2);
                prueba();
            }
        }
        //se deshabilitan y habilitan los botones necesarios
        setDisabledBtnAvanzar(false);
        setDisabledBtnDado(true);
    }
    //Mueve al jugador que tiene el turno dependiendo su contador de pasos
    const moverEnUno=()=>{
        if (turno === "Player 1") {
            let pistaAux = pistaArray;
            pistaAux.map((tipo, index) => {
            if (index === contadorPasos) {      //el contador pasos nos dice la posición del jugador
                pistaAux[index]="box-llena";    //y se coloca al jugador en esa posición
                console.log("SI encontró")
            }else{                              //en todas las casillas que no este el jugador se las pone vacias
                pistaAux[index]="box-vacia";
                console.log("no encontró")
            }
            
        })
        if (contadorPasos+1 !== pistaAux.length) {  //si el jugador no llego a la meta se dipbuja la meta en la ultima posicion
            pistaAux[14] = "box-meta";
        }else{                                      //si no, muestra al jugador en la meta
            pistaAux[14] = "box-meta-llena";
            yaGano();                               //al llegar a la meta se llama a la función que dice que ya ganó un jugador
        }
        setPistaArray(pistaAux);
        }else{                                  //Lo mismo pero para el jugador 2
            let pistaAux = pistaArrayPlayer2;
            pistaAux.map((tipo, index) => {
            if (index === contadorPasosJ2) {
                pistaAux[index]="box-llena";
                console.log("SI encontró")
            }else{
                pistaAux[index]="box-vacia";
                console.log("no encontró")
            }
            
        })
        if (contadorPasosJ2+1 !== pistaAux.length) {
            pistaAux[14] = "box-meta";
        }else{
            pistaAux[14] = "box-meta-llena";
            yaGano();
        }
        setPistaArrayPlayer2(pistaAux);
        }
    }
    //habre una ventana modal con el nombre del jugador con el ultimo turno(el que ganó)
    const yaGano = () =>{
        setModalShowResultado(true);
        setGanador(turno);      
        deshabilitarBotones();  //se deshabilitan los botones
    }
    //Función que se llama en el evento del botón avanzar
    const interactuar=()=>{
        if (turno === "Player 1") {
            if (respuesta) {                            //si el jugador responde correctamente
                if (contadorPasos<=valorDadoTotal) {    //y mientras su contador de pasos no sea mayor a valordadototal
                    setContadorPasos(contadorPasos+1);  //se aumenta el contador de pasos y se llama a la función que mueve al jugador
                    moverEnUno();
                    new Audio(jump).play();
                }else{                              //si el contador de pasos es mayor a valordadototal
                    setTurno("Player 2");           //se cambia el turno al otro jugador
                    setDisabledBtnDado(false);
                    setDisabledBtnAvanzar(true);
                    //setModalShowCambio(true);
                }
            }else{                                              //si responde incorrectamente
                setValorDadoTotal(valorDadoTotal-valorDado);    //se vuelve el valordadototal a su valor anterior
                setTurno("Player 2");                           //y se cambia el turno al otro jugador
                setDisabledBtnDado(false);
                setDisabledBtnAvanzar(true);
                // setModalShowCambio(true);
            }
            //setModalShowCambio(true);
        }else{                              //Lo mismo pero para el jugador 2
            if (respuesta) {
                if (contadorPasosJ2<=valorDadoTotalJ2) {
                    setContadorPasosJ2(contadorPasosJ2+1);
                    moverEnUno();
                    new Audio(jump).play();
                }else{
                    setTurno("Player 1");
                    setDisabledBtnDado(false);
                    setDisabledBtnAvanzar(true);
                }
            }else{
                setValorDadoTotalJ2(valorDadoTotalJ2-valorDado);
                setTurno("Player 1");
                setDisabledBtnDado(false);
                setDisabledBtnAvanzar(true);
                // setModalShowCambio(true);
            }
            //setModalShowCambio(true);
        }
    }
    //esta función abre una ventana modal con una pregunta al azar y con sus respectivas respuestas
    const prueba = () => {
        setModalShow(true);
        let indice =Math.floor(Math.random() * preguntas.length);
        setOrden(Math.ceil(Math.random()*2));
        setPregunta(preguntas[indice].pregunta);
        setFalsa(preguntas[indice].respuestaIncorrecta);
        setVerdadera(preguntas[indice].respuestaCorrecta);
    }
    //Cierra la ventana modal que muestra quién ganó
    const cerrarVentanaModalResultado = () =>{
        setModalShow(false);// oculta la ventana modal
        setModalShowResultado(false);
        setGanador("");
    }
    //Cierra la ventana modal que muestra la pregunta
    const funcionAlCerrarLaVentanaModal = () =>{
        setModalShow(false);// oculta la ventana modal
        setModalShowResultado(false);
        respuestaIncorrecta();
        setGanador("");
    }
    //cierra la ventana modal que muestra el cambio de turno al responder incorrectamente
    const cerrarVentanaModalCambio = () =>{
        setRespuesta(null);
        setModalShowCambio(false);// oculta la ventana modal
        interactuar();
        // setModalShowResultado(false);
        // respuestaIncorrecta();
        // setGanador("");
    }

    //vuelve a los valores iniciales de las variables
    const reiniciar = () =>{
        new Audio(botonAll).play();
        setContadorPasos(1);
        setContadorPasosJ2(1);
        setValorDado(0);
        setValorDadoTotal(0);
        setValorDadoTotalJ2(0);
        let pistaAux = PISTA;
        pistaAux.map((tipo, index) => {
            pistaAux[index]="box-vacia";
        })
        pistaAux[0]="box-llena";
        pistaAux[14]="box-meta";

        let pistaAux2 = PISTA2;
        pistaAux2.map((tipo, index) => {
            pistaAux2[index]="box-vacia";
        })
        pistaAux2[0]="box-llena";
        pistaAux2[14]="box-meta";
        setPistaArray(pistaAux);
        setPistaArrayPlayer2(pistaAux2);
        habilitarBotones();
        setGanador("");
    }
    //esta función se usa cuando el jugador responde correctamente
    const respuestaCorrecta = () =>{
        new Audio(correct).play();
        setModalShow(false);// oculta la ventana modal
        setRespuesta(true);
        console.log(respuesta);
    }
    //esta función se usa cuando el jugador responde incorrectamente
    const respuestaIncorrecta = () =>{
        new Audio(incorrect).play();
        setModalShow(false);// oculta la ventana modal
        setRespuesta(false);
        setModalShowCambio(true);
        console.log(respuesta);
    }
    //deshabilita algunos botones
    const deshabilitarBotones = () =>{
        setDisabledBtnAvanzar(true);
        setDisabledBtnDado(true);
    }
    //habilita algunos botones
    const habilitarBotones = () =>{
        setDisabledBtnAvanzar(true);
        setDisabledBtnDado(false);
    }
    
    
    return(
        <div className='juego-main'>
            <h1 className='titulo-juego'>Slime Race</h1>

            <div className='tablero'>
                <h3>Turno del {turno}</h3>
                <PistaCarrera pista={pistaArray}></PistaCarrera>
                <PistaCarrera pista={pistaArrayPlayer2}></PistaCarrera>
            </div>

            <div className='conteiner-interactivo'>
                <div className='dado'>
                    <Imagen imagen={valorDado} />
                    <button className='boton-juego' disabled={disabledBtnDado} onClick={tirarDado}>Tirar Dado</button>
                </div>

                <div className='botones-conteiner'>
                    <button className='boton-juego' disabled={disabledBtnAvanzar} onClick={interactuar}>Avanzar</button>
                    <button className='boton-juego' onClick={reiniciar}>Reiniciar</button>
                </div>
            </div>
            <VentanaModalPregunta show={modalShow} onHide={funcionAlCerrarLaVentanaModal} pregunta={pregunta} verdadera={verdadera} falsa={falsa}
                orden={orden} dado={valorDado} turno={turno} correcta={respuestaCorrecta} incorrecta={respuestaIncorrecta} />
            <VentanaModalResultado show={modalShowResultado} onHide={cerrarVentanaModalResultado} ganador={ganador} />
            <VentanaModalCambioTurno show={modalShowCambio} onHide={cerrarVentanaModalCambio} turno={turno} />
        </div>
        
    );
}

export default SlimeRace;