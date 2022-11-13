import '../assets/css/pistaCarrera.css';

//componente que "dibuja la pista"
export default function PistaCarrera({pista}){
    //funcionque recorre y retorna el array pista
    const crearPista=()=>{
        //tipo: tipo de dato string que decide como debe llamarse la clase del div a dibujar
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