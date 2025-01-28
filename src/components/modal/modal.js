import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




const ProjectModal = ({projectData, setProjectData, isProjectVisible, handleRemove}) => {
    const [pName, setPName] = useState('')

    //salva o nome do projeto no objeto principal
    const setProjectName = () => {
      let project = {
          name: pName,
          goalSketches: ['Goal 1', 'Goal 2', 'Goal 3'],
          journey: [],
          productView: 'Visão do produto',
          id: 123
      
        }
      setProjectData([...projectData, project])  
    }



  // printa os dados do objeto toda vez que ele é alterado
  useEffect(() => {
    console.log(projectData)
  }, [projectData, isProjectVisible])


  return (
    <div
      className={"modal show " + projectData.id}
      style={{ display: 'block', position: 'initial' }}
    >
      {isProjectVisible && 
      (<Modal.Dialog>
        <Modal.Header closeButton onClick={ () => handleRemove()}>
          <Modal.Title>Criar Projeto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Nome do projeto: </p>
          <Button className='bg-purple' id='project-name' as="input" onChange={(e) => setPName(e.target.value)} type="input" placeholder="Nome do projeto" style={{cursor: 'text'}} />
        </Modal.Body>

        <Modal.Footer>
          
          <Button variant="primary" onClick={ () => {
            handleRemove()
            setProjectName()
            }
          }>Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>)}
    </div>
  );
}

export default ProjectModal;