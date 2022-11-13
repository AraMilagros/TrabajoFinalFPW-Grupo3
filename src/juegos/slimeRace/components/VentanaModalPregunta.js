import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../assets/css/ventanaModal.css';
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
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title className='modal-title' id="contained-modal-title-vcenter">
          Responde correctamente para avanzar {props.dado} lugar/es
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
        <h3>Turno del {props.turno}</h3>
        <h4>{props.pregunta}</h4>
        <h5>A-{props.verdadera}</h5>
        <h5>B-{props.falsa}</h5>
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
          <button className='boton-juego' onClick={props.correcta}>Opcion A</button>
          {/* <Button onClick={props.correcta}>Opcion A</Button> */}
          <button className='boton-juego' onClick={props.incorrecta}>Opcion B</button>
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
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title className='modal-title' id="contained-modal-title-vcenter">
            Responde correctamente para avanzar {props.dado} lugar/es
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
        <h5>Turno del {props.turno}</h5>
        <h4>{props.pregunta}</h4>
        <h5>A-{props.falsa}</h5>
        <h5>B-{props.verdadera}</h5>
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
          <button className='boton-juego' onClick={props.incorrecta}>Opcion A</button>
          <button className='boton-juego' onClick={props.correcta}>Opcion B</button>
        </Modal.Footer>
      </Modal>
    );
  }
    
  }
  //<VentanModal show={modalShow} onHide={funcionAlCerrarLaVentanaModal} mensaje={mensaje} palabra={arrayPalabra}/>