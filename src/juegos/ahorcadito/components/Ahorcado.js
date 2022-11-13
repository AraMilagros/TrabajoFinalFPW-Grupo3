import React, { useState } from "react";
import abecedario from '../json/abecedario.json';
import diccionario from '../json/diccionario.json';
import Botones from "./Botones";
import Imagenes from "./Imagenes";
import "../../ahorcadito/assets/css/styleA.css";
import sonidoDerrota from "../assets/sound/gameover.wav";
import sonidoVictoria from "../assets/sound/win.wav";
import sonidoClick from "../assets/sound/click.wav";
import sonidoError from "../assets/sound/error.wav";

//Declaracion de variables Globales.
let intRest; //se usa para contar los intentos que le quedan al jugador(sirve especialmente para saber si el jugador perdió o no) no se usó useState porque este retardaba el mensaje de derrota.
let arrayPalabraOculta = new Array(0);//se usa para guardar la palabra oculta como un array.
let faltaParaGanar;//se usa para saber si el jugador ganó o no (no se usa useState porque este retardaba el mensaje de victoria).

//Función principal del juego
function Ahorcado() {
// Declaración de variables de Estado.
const[palabra, setPalabra] = useState(" ");//se usa para guardar un String con la palabra que hay que adivinar.
const[palabraRespuesta, setPalabraRespuesta] = useState(" ");//sirve para guardar un String con la palabra oculta.
const[intentosRestantes, setIntentosRestantes] = useState(6);//depende de el valor de esta variable se muestra una imagen.
const[mensaje1, setMensaje1]=useState(" ");//se usa para mostrar un mensaje de si ganó o perdió el jugador.
const[mensaje2, setMensaje2]=useState(" ");//en caso de que se pierda se muestra esta variable con un texto acompañado de la palabra que había que adivinar.
const[arrayPalabra, setArrayPalabra] = useState([]);//es un array que se usa para guardar la palabra que hay que adivinar

//esta función busca y asigna una nueva palabra al azar para adivinar
const asignarPalabra = () => {
  const palabraElegida = diccionario[Math.floor(Math.random() * diccionario.length)];//se declara una constante con ambito de bloque a la que se le asigna una palabra al azar de diccionario.json (esta palabra es un array).
  setArrayPalabra(palabraElegida.palabra);//se cambia el estado de arrayPalabra por el array que se eligió anteriormente.
  arrayPalabraOculta = new Array(palabraElegida.palabra.length).fill('_ ');//se le asigna a esta variable un nuevo array con el mismo tamaño de palabraElegida pero se lo llena con "_ ".
  faltaParaGanar=palabraElegida.palabra.length;//se le asigna a la variable la cantidad de letras que tiene la palabra elegida.
  setPalabraRespuesta(arrayPalabraOculta.join(''));//se transforma el array de la palabra oculta a un string y se le asigna al estado de palabraRespuesta.
  setPalabra(palabraElegida.palabra.join(''));//se transforma el array de la palabra elegida a un string y se le asigna al estado de palabra.

};

//Este método recibe la letra del botón que se seleccionó a travéz del evento y verifica si pertenece o no a la palabra buscada.
const verificarLetra = (event) =>{
  let letra = event.target.textContent;//guarda la letra del botón selecionado en una variable local.
  if (arrayPalabra.includes(letra)){          //Evalúa si la letra pertenece a la palabra buscada si
    for(let i=0; i<arrayPalabra.length;i++){  //esto se cumple con un for se recorre dicha palabra y
        if(arrayPalabra[i]===letra){          //al encontrar la letra, en esta misma posición i, se guarda
            arrayPalabraOculta[i]=letra;      //en el array de la palabra oculta la letra y también
            faltaParaGanar--;                 //se resta en una unidad la cantidad de letras que faltan para ganar.
        }                                     //Esto funciona aún si la letra está repetida.
    }
    play(sonidoClick);                        //con la funcion play se reproduce el audio cada vez que acierte una letra de la palabra
    setPalabraRespuesta(arrayPalabraOculta.join('')); //Si la letra pertenece, se actualiza el estado de la palabra oculta.
  }else{
    intRest--;                      //De no pertenecer la letra a la palabra buscada se resta en una unidad a la variable global
    setIntentosRestantes(intRest);  //de intentos restantes y luego se actualiza el estado de intentosRestantes con este último valor.
    play(sonidoError);                      //con la funcion play se reproduce el audio cada vez que una letra sea incorrecta
  }
  for(let j=0; j<abecedario.length;j++){  //Con este for() se busca en el archivo abecedario.json la letra seleccionada
    if(abecedario[j].letra===letra){      //y se cambia el elmento disable por true. Esto es para deshabilitar este botón.
        abecedario[j].disable=true;
    }
  }
  cambiarResultado(); //se llama a este método para actualizar el mensaje que dice si ganó o no el jugador.
}

//De cumplirse las condiciones la función actualiza los mensajes correspondientes.
const cambiarResultado = ()=>{
    if(intRest <1){                                     //Si la variable global intRest es menor a 1 se 
        play(sonidoDerrota);                            //con la funcion play se reproduce el audio en el caso que se pierda
        setMensaje1("¡¡MEJOR LA PRÓXIMA!!");             //actualiza el estado del mensaje mencionando la derrota y
        setMensaje2("La palabra buscada era: "+palabra);//el de un 2do mensaje con la respuesta. Por último se 
        setIntentosRestantes(0);
        deshabilitarBotones();                          //llama a una función que deshabilita todos los botones con letras.
    }else if(faltaParaGanar<1){                 //Si la variable global faltaParaGanar es menor a 1 se
        play(sonidoVictoria);                   //con la funcion play se reproduce el audio en el caso que se gane
        setMensaje1("¡¡FELICIDADES GANASTE!!");  //actualiza el estado del mensaje mencionando la victoria y
        deshabilitarBotones();                  //se llama a la función que deshabilita todos los botones con letras.
    }else{
        setMensaje1("Adivina la palabra...");  //De no cumplirse ninguna condición se mantiene el mensaje.
    }
}

/*//Dependiendo del estado de intentosRestantes se le asigna a una variable local un string con la
const MostrarImagen = () => {     //ruta de la imagen correspondiente y la función retorna un 
  let imagenParaMostrar;          //elemento img de html con la imagen correspondiente a mostrar.
  switch (intentosRestantes) {
    case 0:
      imagenParaMostrar = "../img/6.png";
      break;
    case 1:
      imagenParaMostrar = "../img/5.png";
      break;
    case 2:
      imagenParaMostrar = "../img/4.png";
      break;
    case 3:
      imagenParaMostrar = "../img/3.png";
      break;
    case 4:
      imagenParaMostrar = "../img/2.png";
      break;
    case 5:
      imagenParaMostrar = "../img/1.png";
      break;
    case 6:
      imagenParaMostrar = "../img/0.png";
      break;
    default:
      imagenParaMostrar = "../img/6.png";
      break;
  }
  return (
    <img src={[imagenParaMostrar]} alt="none"/>
  );
};*/

//Esta función reinicia o resetea las variables a sus valores por defecto
const reiniciarJuego = () =>{
    intRest=6;
    faltaParaGanar=10;  //de no actualizar el sonido de victoria se repite una vez más
    setIntentosRestantes(intRest);
    setMensaje1("Adivina la palabra");
    setMensaje2("");
    cambiarResultado(); //se actualiza los mensajes
    asignarPalabra();   // se asigna una nueva palabra
    habilitarBotones(); //se llama a una función que habilita todos los botones.
}

//Esta función Habilita todos los botones que tienen letras.
const habilitarBotones =()=>{
    for(let i=0;i<abecedario.length;i++){
        abecedario[i].disable=false;
    }
}

//Esta función Deshabilita todos los botones que tienen letras.
const deshabilitarBotones =()=>{
    for(let i=0;i<abecedario.length;i++){
        abecedario[i].disable=true;
    }
}

  return (
    <div className="Ahorcado">
      <main className="main-ahorcadito">
        <section>
          <div className="mensajes">{mensaje1}</div>
          <div className="mensajes3">{palabraRespuesta}</div>
           <div className="mensajes2">{mensaje2}</div>
          <div className="progresoImg">
            <Imagenes i={intentosRestantes} />
          </div>
        </section>
      </main>
      <div className="opciones">
      <button className="New" onClick={reiniciarJuego}>Nueva Palabra</button>
        {abecedario.map((l,i) => (   //con un map se recorre el archivo abecedario.json
              <Botones key={i} elegir={verificarLetra} valor={l.letra} deshabilitar={l.disable} />//se mandan como props, al componente Botones, la funcion VerificarLetra, cada elemnto letra y el elmento disable del json.
            ))}                                                                                   
      </div>
    </div>
  );
}
function play(sonido){                  //funcion que se encarga de reproducir el sonido.
  new Audio(sonido).play();
}
export default Ahorcado;