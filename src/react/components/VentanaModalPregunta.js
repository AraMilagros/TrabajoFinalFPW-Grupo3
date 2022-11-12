import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//let resp = false;
export default function VentanaModalPregunta(props) {
  // const validar = (props)=>{
  //   resp = props;
  //   console.log(props);
  // }
  if (props.orden === 1) {
    console.log(props.orden);
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Responde correctamente para avanzar {props.dado} lugares
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h4>{props.pregunta}</h4>
        <h5>A-{props.verdadera}</h5>
        <h5>B-{props.falsa}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.correcta}>Opcion A</Button>
          <Button onClick={props.incorrecta}>Opcion B</Button>
        </Modal.Footer>
      </Modal>
    );
  }else{
    console.log(props.orden);
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Responde correctamente para avanzar {props.dado} lugares
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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