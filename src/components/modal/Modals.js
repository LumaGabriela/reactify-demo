import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { nanoid } from 'nanoid'

const AddProjectModal = ({ projectData, setProjectData, isVisible, handleRemove }) => {
  const [pName, setPName] = useState('')

  //salva o nome do projeto no objeto principal
  const setProjectName = () => {
    let project = {
      name: pName,
      goalSketches: [],
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
    // console.log(projectData)
  }, [projectData, isVisible])


  return (
    <div
      className={"modal show "}
      style={{ display: isVisible ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
    >
      <Modal.Dialog style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton onClick={() => handleRemove('project')}>
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

          <Button variant="primary" onClick={() => setProjectName()
          }>Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

const ProjectDescriptionModal = ({
  descriptionModal,
  projectData,
  handleRemove,
  modalKey
}) => {
  const project = projectData.find(project => project.key === modalKey)

  useEffect(() => {
  }, [descriptionModal])

  return (
    <div
      className={"modal show "}
      style={{ display: descriptionModal ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
    >
      <Modal.Dialog style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton onClick={() => handleRemove('description')}>
          <Modal.Title>{project ? project.name : 'Projeto Não Encontrado'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>


        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary"
            onClick={() => handleRemove('description')}
          >Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

const JourneyDescriptionModal = ({ projectData, setProjectData, handleRemove, journeyModal, setJourneyModal, modalKey, journeyData }) => {
  const [jValue, setJValue] = useState('')
  const project = projectData.find(project => project.key === modalKey);
  const [journey, setJourney] = useState(null);


  useEffect(() => {console.log(journeyData)
    setJourney(project.journeys[journeyData.journeyindex]);

    // console.log(journey) 

  }, [journeyData, modalKey]);



  const updateJourney = (field, value) => {
    console.log(project, journeyData)
    if ((project && journeyData) !== undefined) {
      const updatedProjectData = projectData.map(proj => {
        if (proj.key === modalKey) { 
          const updatedJourneys = proj.journeys.map((journey, jIndex) => {
            if (jIndex === parseInt(journeyData.journeyindex)) {
              const updatedSteps = journey.steps.map((step, sIndex) => {
                if (sIndex === parseInt(journeyData.stepindex)) {
                  return { ...step, [field]: value };
                }
                return step;
              });
              return { ...journey, steps: updatedSteps };
            }
            return journey;
          });
          return { ...proj, journeys: updatedJourneys };
        }
        return proj;
      });
      console.log('Updated Project Data:', updatedProjectData);
      setProjectData(updatedProjectData);
    }
  };


  return (
    <div
      className={"modal show "}
      style={{ display: journeyModal ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
    >
      <Modal.Dialog style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton onClick={() => handleRemove('journey')}>

          {/* <Modal.Title>{project.journeys ? project.journeys[journeyData.journeyIndex].name : 'Projeto Não Encontrado'}</Modal.Title> */}
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            type="text"
            // value={currentStep.name}
            onChange={(e) => setJValue(e.target.value)}
            placeholder="Nome do passo"
            style={{ cursor: 'text' }}
          />

        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary"
            onClick={() => {
              updateJourney('description', jValue)
              handleRemove('journey')
            }
            }
          >Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export { AddProjectModal, ProjectDescriptionModal, JourneyDescriptionModal }