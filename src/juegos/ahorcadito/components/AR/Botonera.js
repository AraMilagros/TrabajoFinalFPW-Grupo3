import React from "react";
import '../../assets/css/botoneraAR.css';
export default function Botonera({botones,sePresionoBoton}){
    const mostrarBotones=()=>{
        return botones.map((boton,index)=>
        <button className={boton.estado}
                key={index}
                disabled={boton.estado!='no-pulsado'?true:false}
                onClick={()=>sePresionoBoton(index)}>
                {boton.letra}
        </button>
    )
    }
    return(
        <div className='botones'>{mostrarBotones()}</div>
        
    );
}