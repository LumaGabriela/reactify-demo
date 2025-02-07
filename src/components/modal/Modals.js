import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import { RemoveButton } from '../button/Buttons'

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



const JourneyDescriptionModal = ({ projectData, setProjectData, handleRemove, journeyModal, modalKey, journeyData, setJourneyData }) => {
  const [jValue, setJValue] = useState('')
  const project = projectData.find(project => project.key === modalKey);
  const [operation, setOperation] = useState('')




  useEffect(() => {
    if ((project && journeyData) !== undefined) setOperation('description')
      else setOperation('name')
  }, [journeyData, project]);

  //Atualiza o array das journeys
  const updateJourney = (field, value) => {

    console.log(project, journeyData)
    switch (field) {
      //Adiciona uma journey
      case 'name': {

      }
      case 'description': {
        //Atualiza a descrição de uma journey
        const updatedProjectData = projectData.map(proj => {
          if (proj.key === modalKey) {
            const updatedJourneys = proj.journey.map((journey, jIndex) => {
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
            return { ...proj, journey: updatedJourneys };
          }
          return proj;
        });
        setProjectData(updatedProjectData)
      }
      case 'remove': {
        const updatedProjectData = projectData.map(proj => {
          if (proj.key === modalKey) {
            const updatedJourneys = proj.journey.map((journey, jIndex) => {
              if (jIndex === parseInt(journeyData.journeyindex)) {
                const updatedSteps = journey.steps.filter((step, sIndex) => {
                  return sIndex !== parseInt(journeyData.stepindex);
                });
                return { ...journey, steps: updatedSteps };
              }
              return journey;
            });
            return { ...proj, journey: updatedJourneys };
          }
          return proj;
        });
        setProjectData(updatedProjectData);

      }
    }
    setJourneyData(undefined)
    handleRemove('journey')
  };


  return (
    <div
      className={"modal show "}
      style={{ display: journeyModal ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
    >
      <Modal.Dialog style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton onClick={() => {
          handleRemove('journey')
          setJourneyData(undefined)
        }
        }>

          <Modal.Title>{
            (project.journey && journeyData) ?
              "Editar passo: " +
              project.journey[journeyData.journeyindex]?.steps[journeyData.stepindex]?.description :
              'Adicionar Journey'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            type="text"
            onChange={(e) => setJValue(e.target.value)}
            onKeyUp={(e) => { if (e.key === 'Enter') updateJourney('description', jValue) }}
            placeholder={ () => {
              if(operation === 'description') {
                return 'Descrição da jornada'
              } else {
                return 'Nome da jornada'
              }
            }}
            style={{ cursor: 'text' }}
          />

        </Modal.Body>

        <Modal.Footer>

          <Button variant="primary"
            onClick={() => updateJourney('description', jValue)}
          >Salvar</Button>
          <RemoveButton/>

        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

const AddUserStories = ({ projectData, setProjectData, storyModal, handleRemove, modalKey }) => {
  const [sValue, setSValue] = useState('')
  const project = projectData.find(project => project.key === modalKey);


  const addUserStory = (value) => {
    const userStories = project.userStory.length
    const story = { title: value, id: "US" + 2, type: 'user' }
    console.log(story, userStories)
  }

  const updateUserStory = (value) => { }




  useEffect(() => { console.log(project, modalKey) }, [project, modalKey]);
  return (
    <div
      className={"modal show "}
      style={{ display: storyModal ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
    >
      <Modal.Dialog style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton onClick={() => handleRemove('userStory')}>

          <Modal.Title>Adicionar User Story</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            type="text"

            onChange={(e) => setSValue(e.target.value)}
            onKeyUp={(e) => { if (e.key === 'Enter') console.log(sValue) }}
            placeholder="Eu como..."
            style={{ cursor: 'text' }}
          />

        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary"

            onClick={() => addUserStory(sValue)}
          >Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export { AddProjectModal, JourneyDescriptionModal, AddUserStories }