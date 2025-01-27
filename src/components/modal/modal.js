import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




const ProjectModal = ({projectData, setProjectData, isVisible, setIsVisible}) => {
    const [pName, setPName] = useState('')

    //salva o nome do projeto no objeto principal
    const setProjectName = () => {
        setProjectData({
            ...projectData,
            name:pName
        })  
    }

    const handleRemove = () => {
      setIsVisible(false); // Torna o bloco invisível
    };

  // printa os dados do objeto toda vez que ele é alterado
  useEffect(() => {
    console.log(projectData)
  }, [projectData])


  return (
    <div
      className={"modal show " + projectData.id}
      style={{ display: 'block', position: 'initial' }}
    >
      {isVisible && 
      (<Modal.Dialog>
        <Modal.Header closeButton onClick={ () => handleRemove()}>
          <Modal.Title>Criar Projeto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Nome do projeto: </p>
          <Button className='bg-purple' id='project-name' as="input" value={pName} onChange={(e) => setPName(e.target.value)} type="input" placeholder="Nome do projeto" style={{cursor: 'text'}} />
        </Modal.Body>

        <Modal.Footer>
          
          <Button variant="primary" onClick={ () => setProjectName()}>Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>)}
    </div>
  );
}

export default ProjectModal;