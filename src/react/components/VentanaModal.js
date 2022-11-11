//import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function VentanModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Juego Terminado
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.mensaje}</h4>
          <p>
            La palabra era: {props.palabra}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.reiniciarJuego}>Reintentar</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
  //<VentanModal show={modalShow} onHide={funcionAlCerrarLaVentanaModal} mensaje={mensaje} palabra={arrayPalabra}/>