import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { nanoid } from 'nanoid' 

const AddProjectModal = ({projectData, setProjectData, isVisible, handleRemove}) => {
    const [pName, setPName] = useState('')

    //salva o nome do projeto no objeto principal
    const setProjectName = () => {
      let project = {
          name: pName,
          goalSketches: ['Goal 1', 'Goal 2', 'Goal 3'],
          journey: [],
          productView: 'Visão do produto',
          key: nanoid()
        }
      setProjectData([...projectData, project]) 
      setPName('') 
      handleRemove('project')
    }



  // printa os dados do objeto toda vez que ele é alterado
  useEffect(() => {
    console.log(projectData)
  }, [projectData, isVisible])


  return (
    <div
      className={"modal show "}
      style={{ display: isVisible ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
    >
      <Modal.Dialog style={ {marginTop: '6rem'} }>
        <Modal.Header closeButton onClick={ () => handleRemove('project')}>
          <Modal.Title>Criar Projeto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Nome do projeto: </p>
          <Form.Control
            type="text"
            value={pName}
            onKeyUp={(e) => { if (e.key === 'Enter') setProjectName() }}
            onChange={(e) => setPName(e.target.value)}
            placeholder="Nome do projeto"
            style={{ cursor: 'text' }}
          />
        </Modal.Body>

        <Modal.Footer>
          
          <Button variant="primary" onClick={ () => setProjectName()
          }>Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

const ProjectDescriptionModal = ({descriptionModal, setDescriptionModal, projectData, handleRemove, modalKey, setModalKey}) => {
  const project = projectData.find(project => project.key === modalKey)

  useEffect(() => {
  }, [descriptionModal])

  return (
    <div
    className={"modal show "}
    style={{ display: descriptionModal.isVisible ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={ () => handleRemove('description')}>
          <Modal.Title>{project ? project.name : 'Projeto Não Encontrado'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" 
           onClick={ () => handleRemove('description')}
          >Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export  {AddProjectModal, ProjectDescriptionModal}