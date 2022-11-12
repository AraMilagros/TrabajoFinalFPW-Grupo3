import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../assets/css/juegoReact.css';
//let resp = false;
export default function VentanaModalPregunta(props) {
  // const validar = (props)=>{
  //   resp = props;
  //   console.log(props);
  // }
  const {incorrecta,correcta,...other}=props
  if (props.orden === 1) {
    console.log(props.orden);
    return (
      <Modal
        show={props.show} onHide={props.onHide}
        {...other}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Responde correctamente para avanzar {props.dado} lugar/es
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5>Turno del {props.turno}</h5>
        <h4>{props.pregunta}</h4>
        <h5>A-{props.verdadera}</h5>
        <h5>B-{props.falsa}</h5>
        </Modal.Body>
        <Modal.Footer>
          <button className='boton-juego' onClick={props.correcta}>Opcion A</button>
          {/* <Button onClick={props.correcta}>Opcion A</Button> */}
          <Button onClick={props.incorrecta}>Opcion B</Button>
        </Modal.Footer>
      </Modal>
    );
  }else{
    console.log(props.orden);
    return (
      <Modal
        {...other}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Responde correctamente para avanzar {props.dado} lugar/es
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5>Turno del {props.turno}</h5>
        <h4>{props.pregunta}</h4>
        <h5>A-{props.falsa}</h5>
        <h5>B-{props.verdadera}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.incorrecta}>Opcion A</Button>
          <Button onClick={props.correcta}>Opcion B</Button>
        </Modal.Footer>
      </Modal>
    );
  }
    
  }
  //<VentanModal show={modalShow} onHide={funcionAlCerrarLaVentanaModal} mensaje={mensaje} palabra={arrayPalabra}/>