import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




const ProjectModal = ({projectData, setProjectData}) => {
    const setProjectName = (e) => {
        let name = e.target.value
        setProjectData({
            ...projectData,
            name:name
        })
        console.log(projectData)
    }
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
          <p>Nome do projeto: </p>
          <Button className='bg-purple' id='project-name' as="input" type="input" placeholder="Nome do projeto" onKeyUp={ (e) => e.key ? setProjectName(e) : null }/>
        </Modal.Body>

        <Modal.Footer>
          
          <Button variant="primary">Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ProjectModal;