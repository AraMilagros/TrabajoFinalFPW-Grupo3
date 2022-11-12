
import '../assets/css/pistaCarrera.css';

export default function PistaCarrera({pista}){
    const crearPista=()=>{
        return pista.map((tipo,index)=>
        <div className={tipo}
            key={index}>
        </div>
        )
    }
    return(
        <div className="pista">{crearPista()}</div>
    );   
}