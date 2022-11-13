import React, { useEffect, useState } from "react";
import abecedario from"../../json/abecedario.json";
import diccionario from"../../json/diccionario.json";
import PalabraADescubrir from "./PalabraADescubrir";
import Botonera from "./Botonera";
import Imagen from "./Imagen";
import clic from "../../assets/sound/click.wav";
import error from "../../assets/sound/error.wav";
import gameOver from "../../assets/sound/gameover.wav";
import win from "../../assets/sound/win.wav";
import "../../assets/css/ahorcadoAR.css";
import VentanModal from "./VentanaModal";


let arrayPalabra=[];//arreglo vacio donde se almacenará la palabra random
export default function AhorcadoAR(){  

    const [iniciarJuego,setIniciarJuego]=useState(false);//hook que sirver para verificar el estado del juego
    const [numFallos,setNumFallos]=useState(0);//hook para guardar el numero de fallos
    const [palabraOculta,setPalabraOculta]= useState(["_"]);//hook que sirve para mostrar la palabra oculta
    const [botones,setBotones]=useState(0);//hook que se utilizara para cambiar el estado de los botones
    // use state para ventana Modal
    const [modalShow, setModalShow] = useState(false);
    const [mensaje, setMensaje]= useState("");

    //funcion para inicializar el juego con los valores por defecto
    const inicializarJuego=()=>{
        setModalShow(false);// oculta la ventana modal
        new Audio(clic).play();
        arrayPalabra=diccionario[Math.floor(Math.random()*diccionario.length)].palabra;//se asigna una palabra random a arrayPalabra
        setNumFallos(0);
        setPalabraOculta(Array(arrayPalabra.length).fill("_ "));
        setBotones(abecedario.map((l)=>({letra:l.letra, estado:"no-pulsado"})))//un useState que se designa con un array de objetos
        setIniciarJuego(true);
        console.log(arrayPalabra);
    }
    //useEffect para verificar si gano o perdio
    useEffect(()=>{
        if(palabraOculta.toString()==arrayPalabra.toString()){
            new Audio(win).play();
            setMensaje("¡Ganaste!");
            setModalShow(true);
        }
        if(numFallos==6){
            new Audio(gameOver).play();
            setMensaje("¡Perdiste!");
            setModalShow(true);
        }
        
    })
    // funcion que verifica que letra se presiono
    const sePresionoBoton = (i) => {      
        if (coincideLetra(i)) {// si la letra coincide se recorre el array de objetos de botones y se le cambia el estado
            new Audio(clic).play();
            const nuevoEstado=botones.map((obj,index)=>{
                if(index==i){
                    return{...obj,estado:'pulsado-acertado'};
                }else{
                    return obj;
                }
            })
            setBotones(nuevoEstado);

        } else {
            new Audio(error).play();
            setNumFallos(numFallos + 1);
            const nuevoEstado=botones.map((obj,index)=>{
                if(index==i){
                    return{...obj,estado:'pulsado-no-acertado'};
                }else{
                    return obj;
                }
            })
            setBotones(nuevoEstado);
        }
    }
    //funcion para verificar que la letra se encuentra en la palabra
    const coincideLetra = (i) => {
        let acierto = false;
        let letraEscogida = botones[i].letra;
        let palabraOcultaAux=palabraOculta;
        arrayPalabra.map((letra, index) => {
            if (letra == letraEscogida) { 
                palabraOcultaAux[index]=letra;
                setPalabraOculta(palabraOcultaAux);               
                acierto = true;
            }
        })
        return acierto;
    }
    //Renderizado codicional
    if (iniciarJuego) {
        return (
            <div className="main">
                <Imagen imagen={numFallos} />
                <PalabraADescubrir palabraADescubrir={palabraOculta} />
                <Botonera sePresionoBoton={(i) => sePresionoBoton(i)} botones={botones} />
                <button className="boton-reinicio" onClick={inicializarJuego}>Reiniciar Juego</button>
                <VentanModal show={modalShow} onHide={inicializarJuego} mensaje={mensaje} palabra={arrayPalabra}/>
                {/* <VentanModal show={modalShow} mensaje={mensaje} palabra={arrayPalabra}reiniciarJuego={inicializarJuego}/> */}
            </div>
        );
    } else {
        return (
            <div className="main">                 
                <button className="boton-reinicio" onClick={inicializarJuego}>Iniciar Juego</button>
            </div>
        );
    }
}
