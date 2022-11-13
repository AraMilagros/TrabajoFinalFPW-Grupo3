import Modal from 'react-bootstrap/Modal';

//ventana modal que avisa que el jugador se equivocó y que se cambia el turno
export default function VentanaModalCambioTurno(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Te equivocaste....
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h1>Ahora es el turno del {props.turno}</h1>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.correcta}>Opcion A</Button>
          <Button onClick={props.incorrecta}>Opcion B</Button> */}
        </Modal.Footer>
      </Modal>
    );
    
  }