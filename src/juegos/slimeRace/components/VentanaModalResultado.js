import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//ventana modal que muestra al jugador que ganó
export default function VentanaModalResultado(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Resultado
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h1>La Victora es del {props.ganador}</h1>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.correcta}>Opcion A</Button>
          <Button onClick={props.incorrecta}>Opcion B</Button> */}
        </Modal.Footer>
      </Modal>
    );
    
  }