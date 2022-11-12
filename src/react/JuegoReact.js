import React, { useEffect, useState } from 'react';
import PistaCarrera from './components/PistaCarrera';
import PISTA from'./components/Constante';
import PISTA2 from'./components/Constante2';
import VentanaModalPregunta from './components/VentanaModalPregunta';
import VentanaModalResultado from './components/VentanaModalResultado';
import preguntas from './../json/preguntas.json';

function JuegoReact(){

    const[modalShow, setModalShow] = useState(false);
    const[modalShowResultado, setModalShowResultado] = useState(false);
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
    
    const tirarDado=()=>{
        let valorRandon=Math.ceil(Math.random()*6)
        setValorDado(valorRandon);
        if (turno === "Player 1") {
            let auxiliar=valorDadoTotal;
            
            auxiliar+=valorRandon;
            if (auxiliar<=11) {
                setValorDadoTotal(valorRandon+valorDadoTotal);
                prueba();
            }
        }else{
            let auxiliar=valorDadoTotalJ2;
            
            auxiliar+=valorRandon;
            if (auxiliar<=11) {
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
            pistaAux[11] = "box-meta";
        }else{
            pistaAux[11] = "box-meta-llena";
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
            pistaAux[11] = "box-meta";
        }else{
            pistaAux[11] = "box-meta-llena";
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
                }else{
                    setTurno("Player 2");
                    setDisabledBtnDado(false);
                    setDisabledBtnAvanzar(true);
                }
            }else{
                setValorDadoTotal(valorDadoTotal-valorDado);
                setTurno("Player 2");
                setDisabledBtnDado(false);
                setDisabledBtnAvanzar(true);
            }
        }else{
            if (respuesta) {
                if (contadorPasosJ2<=valorDadoTotalJ2) {
                    setContadorPasosJ2(contadorPasosJ2+1);
                    moverEnUno();
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
            }
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
    }

    const reiniciar = () =>{
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
        pistaAux[11]="box-meta";

        let pistaAux2 = PISTA2;
        pistaAux2.map((tipo, index) => {
            pistaAux2[index]="box-vacia";
        })
        pistaAux2[0]="box-llena";
        pistaAux2[11]="box-meta";
        setPistaArray(pistaAux);
        setPistaArrayPlayer2(pistaAux2);
        habilitarBotones();
    }

    const respuestaCorrecta = () =>{
        setModalShow(false);// oculta la ventana modal
        setRespuesta(true);
        console.log(respuesta);
    }

    const respuestaIncorrecta = () =>{
        setModalShow(false);// oculta la ventana modal
        setRespuesta(false);
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
        <>
        <h1>JuegoReact</h1>
        <h3>Turno del {turno}</h3>
        <PistaCarrera pista={pistaArray}></PistaCarrera>
        <PistaCarrera pista={pistaArrayPlayer2}></PistaCarrera>
        <button disabled={disabledBtnDado} onClick={tirarDado}>tirar dado</button>
        <div>DADO: {valorDado}</div>
        {/* <div>POSICION: {contadorPasos}</div> */}
        <button disabled={disabledBtnAvanzar} onClick={interactuar}>avanzar</button>
        <button onClick={reiniciar}>Reiniciar</button>
        <VentanaModalPregunta show={modalShow} onHide={funcionAlCerrarLaVentanaModal} pregunta={pregunta} verdadera={verdadera} falsa={falsa} orden={orden} dado={valorDado} correcta={respuestaCorrecta} incorrecta={respuestaIncorrecta}/>
        <VentanaModalResultado show={modalShowResultado} onHide={funcionAlCerrarLaVentanaModal} ganador={ganador}/>
        </>
        
    );
}

export default JuegoReact;