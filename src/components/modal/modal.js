import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalMenu() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Criar Projeto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Caracteristicas do projeto</p>
        </Modal.Body>

        <Modal.Footer>
          
          <Button variant="primary">Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalMenu;