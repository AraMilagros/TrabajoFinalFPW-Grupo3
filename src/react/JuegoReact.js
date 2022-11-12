//import React from 'react';
import React, { useEffect, useState } from "react";
import PistaCarrera from './components/PistaCarrera';
import VentanaModalPregunta from './components/VentanaModalPregunta';
import preguntas from './../json/preguntas.json';

var respuesta=false;
function JuegoReact(){

    const[modalShow, setModalShow] = useState(false);
    const[pregunta, setPregunta]=useState("");
    const[falsa, setFalsa] = useState("");
    const[verdadera, setVerdadera] = useState("");
    const[orden, setOrden] = useState(0);
    //const[respuesta, setRespuesta] = useState(false);
    

    const prueba = () => {
        setModalShow(true);
        let indice =Math.floor(Math.random() * preguntas.length);
        setOrden(Math.ceil(Math.random()*2));
        //const preguntaElegida = preguntas[3].pregunta;
        setPregunta(preguntas[indice].pregunta);
        setFalsa(preguntas[indice].respuestaIncorrecta);
        setVerdadera(preguntas[indice].respuestaCorrecta);
    }
    const funcionAlCerrarLaVentanaModal = () =>{
        setModalShow(false);// oculta la ventana modal
        respuesta = true;
    }

    const respuestaCorrecta = () =>{
        setModalShow(false);// oculta la ventana modal
        //setRespuesta(true);
        respuesta=true;
        console.log(respuesta);
    }
    const respuestaIncorrecta = () =>{
        setModalShow(false);// oculta la ventana modal
        //setRespuesta(false);
        respuesta=false;
        console.log(respuesta);
    }

    return(
        <>
        <h1>JuegoReact</h1>
        <PistaCarrera></PistaCarrera>
        
        <button className="boton-reinicio" onClick={prueba}>Prueba de Ventana Modal</button>
        <VentanaModalPregunta show={modalShow} onHide={funcionAlCerrarLaVentanaModal} pregunta={pregunta} verdadera={verdadera} falsa={falsa} orden={orden} correcta={respuestaCorrecta} incorrecta={respuestaIncorrecta}/>        
        </>
        
    );
}

export default JuegoReact;