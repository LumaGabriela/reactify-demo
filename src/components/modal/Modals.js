import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import { RemoveButton } from '../button/Buttons'
import './Modals.css'

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
    if (Object.keys(journeyData).length !== 0) setOperation('description')

    else setOperation('name')
  }, [journeyData]);

  //Atualiza o array das journeys
  const updateJourney = (op) => {
    const operationType = (op ? op : operation)

    switch (operationType) {
      //Adiciona uma journey
      case 'name': {
        const newJourney = {
          name: jValue,
          steps: []
        };

        const updatedProjectData = projectData.map(proj => {
          if (proj.key === modalKey) {
            return { ...proj, journey: [...proj.journey, newJourney] };
          }
          return proj;
        });

        setProjectData(updatedProjectData);
      }
        break;

      case 'description': {
        //Atualiza a descrição de uma journey
        const updatedProjectData = projectData.map(proj => {
          if (proj.key === modalKey) {
            const updatedJourneys = proj.journey.map((journey, jIndex) => {
              if (jIndex === parseInt(journeyData.journeyindex)) {
                const updatedSteps = journey.steps.map((step, sIndex) => {
                  if (sIndex === parseInt(journeyData.stepindex)) {
                    return { ...step, description: jValue };
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
        break;

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
        break;
      default: console.log('Operacao desconhecida')
    }
    setJourneyData({})
    handleRemove('journey')
    console.log(projectData)
  };


  return (
    <div
      className={"modal show "}
      style={{ display: journeyModal ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
    >
      <Modal.Dialog style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton onClick={() => {
          handleRemove('journey')
          setJourneyData({})
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
            onKeyUp={(e) => { if (e.key === 'Enter') updateJourney() }}
            placeholder='Descrição da jornada'
            style={{ cursor: 'text' }}
          />

        </Modal.Body>

        <Modal.Footer>
          <RemoveButton
            handleRemove={handleRemove}
            type={'journey'}
            updateJourney={updateJourney}
          />
          <Button variant="primary"
            onClick={() => updateJourney()}
          >Salvar</Button>


        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

const AddUserStories = ({ projectData, setProjectData, storyData, setStoryData, handleRemove, storyModal, modalKey }) => {
  const [sValue, setSValue] = useState('')
  const [sType, setSType] = useState('')
  const project = projectData.find(project => project.key === modalKey);
  const [operation, setOperation] = useState('')


  useEffect(() => {
    if (storyData !== '') setOperation('description')
    else setOperation('name')
  }, [storyData]);

  //Renumerar os ids das userstories
  const renumberUserStories = (stories) => {
    return stories
      .sort((a, b) => {
        const idA = parseInt(a.id.replace('US', ''));
        const idB = parseInt(b.id.replace('US', ''));
        return idA - idB;
      })
      .map((story, index) => ({
        ...story,
        id: `US${(index + 1).toString().padStart(2, '0')}`
      }));
  }
  //Atualiza os valores do array userStory    
  const updateUserStory = (op) => {
    const operationType = (op ? op : operation)

    switch (operationType) {
      //Adiciona uma nova STORY
      case 'name': {
        const updatedProjectData = projectData.map(proj => {
          if (proj.key === modalKey) {
            const newStory = {
              id: `US${(proj.stories.length + 1).toString().padStart(2, '0')}`,
              title: sValue,
              type: 'user'
            };

            const updatedStories = renumberUserStories([
              ...proj.stories,
              newStory
            ]);

            return {
              ...proj,
              stories: updatedStories
            };
          }
          return proj;
        });
        setProjectData(updatedProjectData);
      }
        break;

      case 'description': {
        const updatedProjectData = projectData.map(proj => {
          if (proj.key === modalKey) {
            const updatedStories = proj.stories.map((story) => {
              if (story.id === storyData) {
                return { ...story, title: sValue }
              }
              return story
            })
            return { ...proj, stories: updatedStories }
          }
          return proj
        })
        setProjectData(updatedProjectData)
      }
        break;
      case 'remove': {
        const updatedProjectData = projectData.map(proj => {
          if (proj.key === modalKey) {
            const updatedStories = proj.stories.filter(story => {
              return story.id !== storyData
            })
            return { ...proj, stories: renumberUserStories(updatedStories) }
          }
          return proj
        })
        setProjectData(updatedProjectData)
      }
        break;
      default: console.log('Operacao desconhecida')
        break;
    }
    setStoryData('')
    handleRemove('userStory')

  }


  useEffect(() => console.log(project.stories, sType), [project, modalKey])

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
          <>Título da story</>
          <Form.Control
            type="text"
            onChange={(e) => setSValue(e.target.value)}
            onKeyUp={(e) => { if (e.key === 'Enter') updateUserStory() }}
            placeholder="Eu como..."
            style={{ cursor: 'text' }}
          />
          <>Tipo de story</>
          <select 
          value={sType}
          onChange={ (e) => setSType(e.target.value)}
          className="form-select" 
          aria-label="Default select example"
          >
            <option value="user">Usuário</option>
            <option value="system">Sistema</option>

          </select>

        </Modal.Body>

        <Modal.Footer>
          <RemoveButton
            handleRemove={handleRemove}
            type={'userStory'}
            updateUserStory={updateUserStory}
          />
          <Button variant="primary"

            onClick={() => updateUserStory()}
          >Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}


export { AddProjectModal, JourneyDescriptionModal, AddUserStories }