
import '../assets/css/pistaCarrera.css';

export default function PistaCarrera(){
    var pista = ["box-llena" ,"box-vacia", "box-vacia", 
                "box-vacia", "box-vacia", "box-vacia",
                "box-vacia", "box-vacia", "box-vacia",
                "box-vacia", "box-vacia", "box-meta"];//esto crearlo en otro archivo y traerlo como props

    const crearPista=()=>{
        return pista.map((tipo,index)=>
        <button className={tipo}
            key={index}>
        </button>
        )
    }
    return(
        <div>{crearPista()}</div>
    );   
}