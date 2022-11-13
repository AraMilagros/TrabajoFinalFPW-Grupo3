import img1 from '../assets/img/juego/img0.png';
import img2 from '../assets/img/juego/img1.png';
import img3 from '../assets/img/juego/img2.png';
import img4 from '../assets/img/juego/img3.png';
import img5 from '../assets/img/juego/img4.png';
import img6 from '../assets/img/juego/img5.png';
import img7 from '../assets/img/juego/img6.png';
import "../../ahorcadito/assets/css/styleA.css";
import gameOver from '../assets/img/juego/img7.png';

const Imagenes = (props) => {
    const arrayImagenes =[img7, img6, img5, img4, img3, img2, img1]
    return (
        <div>
        <img className='imagen' src={arrayImagenes[props.i]}/>
        </div>
      );
}

export default Imagenes;
