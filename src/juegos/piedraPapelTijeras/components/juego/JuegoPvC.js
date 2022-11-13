import React,{useEffect, useState} from "react";
import Opcion from "./Opcion";
import "../../assets/css/juegoPvC.css"
export default function JuegoPvC(props){
    const [numRandom,setNumRandom]= useState(3);// numero ramdom de la Pc
    const [numeroJugador,setNumeroJugador]=useState(3);// numero que elije el usuario
    const [mensaje,setMensaje]=useState("Esperando elección...");
    const [mensaje2,setMensaje2]=useState("");
    const [puntajeUser,setPuntajeUser]=useState(0);//inicializando el puntaje del usuario a 0
    const [puntajePc,setPuntajePc]=useState(0);//inicializando el puntaje de la PC a 0
    const [play,setPlay]=useState(false);// estado booleano que controla que no se presione muchas veces el boton jugar
    const [state,setState]=useState(0);// contador que se utilza para verificar el cambio en useEffect
    
    useEffect(()=>{
        jugar();
    },[state])
    useEffect(()=>{
        if(play){
            setMensaje2("Moviento elegido");            
        }else{
            setMensaje2("Elige tu movimiento");
        }
    },[play])
    const generarNumRandom=()=>{
        if (play) { 
            setState(state+1);         
            setNumRandom(Math.floor(Math.random()*3));//Math.floor() redondea hacia abajo un num entero
        }
    }
    const reiniciarJuego=()=>{     
        setNumRandom(3);
        setNumeroJugador(3);
        setMensaje("Esperando elección...");
        setPlay(false);
        setPuntajePc(0);
        setPuntajeUser(0);
    }
    const jugar = () => {
        switch (numeroJugador) {//esto representa la opcion que el user eligio
            case 0:// piedra
                switch (numRandom) {//Esto representa la opcion que se generó para la PC
                    case 0://Cambia el msj dependiendo de cada situacion
                        setMensaje("Empate");
                        break;
                    case 1:
                        setMensaje("Perdiste");
                        setPuntajePc(puntajePc + 1);
                        break;
                    case 2:
                        setMensaje("Ganaste");
                        setPuntajeUser(puntajeUser + 1);
                        break;
                }
                break;
            case 1://papel
                switch (numRandom) {
                    case 0:
                        setMensaje("Ganaste");
                        setPuntajeUser(puntajeUser + 1);
                        break;
                    case 1:
                        setMensaje("Empate");
                        break;
                    case 2:
                        setMensaje("Perdiste");
                        setPuntajePc(puntajePc + 1);
                        break;
                }
                break;
            case 2://tijera
                switch (numRandom) {
                    case 0:
                        setMensaje("Perdiste");
                        setPuntajePc(puntajePc + 1);
                        break;
                    case 1:
                        setMensaje("Ganaste");
                        setPuntajeUser(puntajeUser + 1);
                        break;
                    case 2:
                        setMensaje("Empate");
                        break;
                }
                break;
            default:
                setMensaje("Esperando elección...");
                break;
        }
    }

    return(
            <div className="main-ppt">
                <div className="menu-juego-up">
                    <div className="user-pc">
                        <h2>Jugador</h2>
                        <img src={props.img[numeroJugador]} alt="none" />
                    </div>
                    <div className="conteiner-marcador">
                        <div className="marcador">
                            <h3>Marcador</h3>
                            <h3>{puntajeUser}:{puntajePc}</h3>               
                        </div> 
                        <h2>{mensaje}</h2>
                    </div>
                                      
                    <div className="user-pc">
                        <h2>Computadora</h2>
                        <img src={props.img[numRandom]} alt="none"/>
                    </div>
                    
                </div>
                
                <h6>{mensaje2}</h6>
                <div className="botones-juego">
                    {/* cada button posee una img de piedra, papel y tijera, las cuales estan representadas
                        por los numeros 0 1 y 2 respectivamente
                        Cuando el evento onClick sea llamada se actualizara el setNumeroJugador con la opcion que el user elija
                        a la vez que se llamara la funcion generarNumRandom para obtener la opcion por parte de la PC */}
                    <button onClick={() => {setNumeroJugador(0), setPlay(true)}}><img src={props.img[0]} alt="rock"/></button>
                    <button onClick={() => {setNumeroJugador(1), setPlay(true)}}><img src={props.img[1]} alt="paper"/></button>
                    <button onClick={() => {setNumeroJugador(2), setPlay(true)}}><img src={props.img[2]} alt="scissors"/></button>
                </div>               
                <Opcion jugar={()=>{generarNumRandom(),setPlay(false)}} reiniciar={reiniciarJuego}/>
            </div>
    );
}