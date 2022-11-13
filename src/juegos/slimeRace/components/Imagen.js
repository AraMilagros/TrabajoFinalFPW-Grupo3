import none from '../assets/img/dado/dado.png';
import img1 from '../assets/img/dado/1.png';
import img2 from '../assets/img/dado/2.png';
import img3 from '../assets/img/dado/3.png';
import img4 from '../assets/img/dado/4.png';
import img5 from '../assets/img/dado/5.png';
import img6 from '../assets/img/dado/6.png';
import '../assets/css/imagen.css';

export default function Imagen({imagen}){
    const imagenes =[none,img1, img2, img3, img4, img5, img6];

    return(
        <img className='imagen-dado' src={imagenes[imagen]} alt="dado"/>
    );
}