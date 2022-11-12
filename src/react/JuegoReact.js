import React, { useEffect, useState } from 'react';
import PistaCarrera from './components/PistaCarrera';
import PISTA from'./components/Constante';
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
    
    const [valorDado,setValorDado]=useState(0);
    const [valorDadoTotal,setValorDadoTotal]=useState(0);
    const [contadorPasos,setContadorPasos]=useState(0);
    const [pistaArray,setPistaArray]=useState(PISTA)
    
    const tirarDado=()=>{
        const valorRandon=Math.floor(Math.random()*6)+1
        setValorDado(valorRandon);
        setValorDadoTotal(valorRandon+valorDado);
    }
    const moverEnUno=()=>{
        return new Promise ((resolve)=>{
            setTimeout(() => {//todo lo que está dentro del timeOut se puede poner en otra funcion o en interactuar(), porque no se esta haciendo que espere, ya que tiene el boton de avanzar
                let pistaAux = pistaArray;
                pistaArray.map((tipo, index) => {

                    if(contadorPasos==pistaArray.length -1){
                        pistaAux[pistaArray.length -1] = "box-meta-llena";
                    }else if (contadorPasos + 1 == index) {
                        pistaAux[index] = "box-llena";
                    } else if (index == pistaArray.length - 1) {
                        pistaAux[index] = "box-meta";
                    } else {
                        pistaAux[index] = "box-vacia";
                    }
                    setPistaArray(pistaAux);
                })
                setContadorPasos(contadorPasos+1);
                console.log(contadorPasos);
                // console.log(contadorPasos);
                resolve(contadorPasos)
            }, 10);//el 10 es el tiempo en milisegundos que espera antes de ejecutar esto
        })
    }
    async function llamaPromesa(){
        const almacenaPromesa= await moverEnUno();//espera a que se cumpla la promesa antes de asignar a la variable
        // if(contadorPasos<valorDado){
        //     interactuar();
        // }
        // console.log(almacenaPromesa);
    }
    const interactuar=()=>{
        console.log(contadorPasos,valorDadoTotal);
        if (contadorPasos<valorDadoTotal){
            llamaPromesa();   
        }
    }
    
    
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
        <PistaCarrera pista={pistaArray}></PistaCarrera>
        <button onClick={tirarDado}>tirar dado</button>
        <div>{valorDado}</div>
        <div>{contadorPasos}</div>
        <button onClick={interactuar}>avanzar</button>
        <button className="boton-reinicio" onClick={prueba}>Prueba de Ventana Modal</button>
        <VentanaModalPregunta show={modalShow} onHide={funcionAlCerrarLaVentanaModal} pregunta={pregunta} verdadera={verdadera} falsa={falsa} orden={orden} correcta={respuestaCorrecta} incorrecta={respuestaIncorrecta}/>
        </>
        
    );
}

export default JuegoReact;