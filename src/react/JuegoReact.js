import React, { useEffect, useState } from 'react';
// import ReactHowler from 'react-howler';
import PistaCarrera from './components/PistaCarrera';
import {PISTA,PISTA2} from'./components/Constante';
import VentanaModalPregunta from './components/VentanaModalPregunta';
import VentanaModalResultado from './components/VentanaModalResultado';
import VentanaModalCambioTurno from './components/VentanaModalCambioTurno';
import preguntas from './assets/json/preguntas.json';

import './assets/css/juegoReact.css';
import Imagen from './components/Imagen';
import win from './assets/sound/win.wav';
import jump from './assets/sound/jump.mp3';
import correct from './assets/sound/respuestaCorrecta.mp3';
import incorrect from './assets/sound/respuestaIncorrecta.mp3';
import botonAll from './assets/sound/botonAll.mp3';

function JuegoReact(){

    const[modalShow, setModalShow] = useState(false);
    const[modalShowResultado, setModalShowResultado] = useState(false);
    const[modalShowCambio, setModalShowCambio] = useState(false);
    const[ganador, setGanador]=useState("");
    const[pregunta, setPregunta]=useState("");
    const[falsa, setFalsa] = useState("");
    const[verdadera, setVerdadera] = useState("");
    const[orden, setOrden] = useState(0);
    const[disabledBtnDado, setDisabledBtnDado] = useState(false);
    const[disabledBtnAvanzar, setDisabledBtnAvanzar] = useState(true);
    const[respuesta, setRespuesta] = useState(true);
    const[turno, setTurno] = useState("Player 1");
    
    const [valorDado,setValorDado]=useState(0);
    const [valorDadoTotal,setValorDadoTotal]=useState(0);
    const [contadorPasos,setContadorPasos]=useState(1);
    const [pistaArray,setPistaArray]=useState(PISTA);
    const [valorDadoTotalJ2,setValorDadoTotalJ2]=useState(0);
    const [contadorPasosJ2,setContadorPasosJ2]=useState(1);
    const [pistaArrayPlayer2,setPistaArrayPlayer2]=useState(PISTA2);
    
    useEffect(()=>{
        if (ganador !== "") {
            new Audio(win).play();
        }
    })

    const tirarDado=()=>{
        new Audio(botonAll).play();
        let valorRandon=Math.ceil(Math.random()*6)
        setValorDado(valorRandon);
        if (turno === "Player 1") {
            let auxiliar=valorDadoTotal;
            
            auxiliar+=valorRandon;
            if (auxiliar<=14) {
                setValorDadoTotal(valorRandon+valorDadoTotal);
                prueba();
            }
        }else{
            let auxiliar=valorDadoTotalJ2;
            
            auxiliar+=valorRandon;
            if (auxiliar<=14) {
                setValorDadoTotalJ2(valorRandon+valorDadoTotalJ2);
                prueba();
            }
        }
        setDisabledBtnAvanzar(false);
        setDisabledBtnDado(true);
    }
    const moverEnUno=()=>{
        if (turno === "Player 1") {
            let pistaAux = pistaArray;
            pistaAux.map((tipo, index) => {
            if (index === contadorPasos) {
                pistaAux[index]="box-llena";
                console.log("SI encontró")
            }else{
                pistaAux[index]="box-vacia";
                console.log("no encontró")
            }
            
        })
        if (contadorPasos+1 !== pistaAux.length) {
            pistaAux[14] = "box-meta";
        }else{
            pistaAux[14] = "box-meta-llena";
            yaGano();
        }
        setPistaArray(pistaAux);
        }else{
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
    const yaGano = () =>{
        setModalShowResultado(true);
        setGanador(turno);      
        deshabilitarBotones();
    }

    const interactuar=()=>{
        if (turno === "Player 1") {
            if (respuesta) {
                if (contadorPasos<=valorDadoTotal) {
                    setContadorPasos(contadorPasos+1);
                    moverEnUno();
                    new Audio(jump).play();
                }else{
                    setTurno("Player 2");
                    setDisabledBtnDado(false);
                    setDisabledBtnAvanzar(true);
                    //setModalShowCambio(true);
                }
            }else{
                setValorDadoTotal(valorDadoTotal-valorDado);
                setTurno("Player 2");
                setDisabledBtnDado(false);
                setDisabledBtnAvanzar(true);
                // setModalShowCambio(true);
            }
            //setModalShowCambio(true);
        }else{
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
    
    const prueba = () => {
        setModalShow(true);
        let indice =Math.floor(Math.random() * preguntas.length);
        setOrden(Math.ceil(Math.random()*2));
        setPregunta(preguntas[indice].pregunta);
        setFalsa(preguntas[indice].respuestaIncorrecta);
        setVerdadera(preguntas[indice].respuestaCorrecta);
    }

    const funcionAlCerrarLaVentanaModal = () =>{
        setModalShow(false);// oculta la ventana modal
        setModalShowResultado(false);
        respuestaIncorrecta();
        setGanador("");
    }
    const cerrarVentanaModalCambio = () =>{
        setRespuesta(null);
        setModalShowCambio(false);// oculta la ventana modal
        interactuar();
        // setModalShowResultado(false);
        // respuestaIncorrecta();
        // setGanador("");
    }

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

    const respuestaCorrecta = () =>{
        new Audio(correct).play();
        setModalShow(false);// oculta la ventana modal
        setRespuesta(true);
        console.log(respuesta);
    }

    const respuestaIncorrecta = () =>{
        new Audio(incorrect).play();
        setModalShow(false);// oculta la ventana modal
        setRespuesta(false);
        setModalShowCambio(true);
        console.log(respuesta);
    }

    const deshabilitarBotones = () =>{
        setDisabledBtnAvanzar(true);
        setDisabledBtnDado(true);
    }
    const habilitarBotones = () =>{
        setDisabledBtnAvanzar(true);
        setDisabledBtnDado(false);
    }
    
    
    return(
        <div className='juego-main'>
            <h1 className='titulo'>Slime Race</h1>

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
            <VentanaModalResultado show={modalShowResultado} onHide={funcionAlCerrarLaVentanaModal} ganador={ganador} />
            <VentanaModalCambioTurno show={modalShowCambio} onHide={cerrarVentanaModalCambio} turno={turno} />
        </div>
        
    );
}

export default JuegoReact;