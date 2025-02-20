import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import { RemoveButton } from '../button/Buttons'
import './Modals.css'

const AddProjectModal = ({ userData, setUserData, isVisible, handleRemove, projectKey }) => {
  const [pName, setPName] = useState('')

  //salva o nome do projeto no objeto principal
  const setProjectName = () => {
    const updatedUserData =
    {
      ...userData,
      projects: [...userData.projects, {
        name: pName,
        goalSketches: [],
        journey: [],
        productView: 'Visão do produto',
        key: nanoid()
      }]
    }

    setUserData(updatedUserData);
    setPName('');
    handleRemove('project');
  }



  // printa os dados do objeto toda vez que ele é alterado
  useEffect(() => {
  }, [userData, isVisible])


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

const JourneyDescriptionModal = ({ userData, setUserData, handleRemove, journeyModal, projectKey, journeyData, setJourneyData, operation, setOperation }) => {
  const [jValue, setJValue] = useState('')
  const [removeType, setRemoveType] = useState('')
  const project = userData.projects?.find(project => project.key === projectKey);
  const [bodyHeight, setBodyHeight] = useState('100%');

  //Torna a altura da sombra do modal variavel 
  useEffect(() => {
    const height = document.body.scrollHeight;
    setBodyHeight(`${height}px`)
    //Se o modal está fechado, redefine os valores da journey
    if (!journeyModal) {
      setJourneyData({})
      setJValue('')
    }
  }, [journeyModal]);

  //Define o tipo de botao remove
  useEffect(() => {console.log(operation)
    switch(operation) {
      case 'remove-journey': setRemoveType(operation)
      break
      case 'description': setRemoveType(operation)
      break
    }
  }, [operation])
  //Define o valor de operation
  useEffect(() => {
    //Caso haja valor previo (remove ou add-step), manter o valor
    if (operation !== '' && Object.keys(journeyData).length !== 0) void 0
    //caso não e o journeyData tenha valores definidos, operacao sera atualizar descricao
    else if (Object.keys(journeyData).length !== 0) setOperation('description')
    //do contrario, a operaccao sera de adicionar uma nova journey
    else setOperation('name')
  }, [journeyData])

  //Seletor de valores para o placeholder
  const getPlaceholder = () => {
    if (operation === 'add-step') {
      return 'Descreva o passo';
    } else if (operation === 'description' && Object.keys(journeyData).length > 0) {
      return 'Descreva o passo';
    } else if (operation === 'name') {
      return 'Nome da jornada';
    } else {
      return 'Digite aqui';
    }
  }
  //Seletor de valores para o titulo
  const getTitle = () => {
    if (operation === 'add-step') {
      return 'Adicionar novo passo';
    } else if (operation === 'description' && Object.keys(journeyData).length > 0) {
      return `Editar passo: ${project.journey[journeyData.journeyindex]?.steps[journeyData.stepindex]?.description}`
    } else if (operation === 'name') {
      return 'Nome da jornada';
    }else if (operation === 'remove-journey'){
      return 'Deseja remover a jornada?'
      }
  }

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

        const updateduserData = userData.projects?.map(proj => {
          if (proj.key === projectKey) {
            return { ...proj, journey: [...proj.journey, newJourney] };
          }
          return proj;
        });

        setUserData(updateduserData);
      }
        break;

      //Atualiza a descrição de uma journey
      case 'description': {

        const updateduserData = userData.projects?.map(proj => {
          if (proj.key === projectKey) {
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
        setUserData(updateduserData)
      }
        break;
      //Remove um passo de uma journey
      case 'remove-journey-step': {
        const updateduserData = userData.projects?.map(proj => {
          if (proj.key === projectKey) {
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
        setUserData(updateduserData);

      }
        break;
      //Remove a journey por inteiro
      case 'remove-journey': {
        const updateduserData = userData.projects?.map(proj => {
          if (proj.key === projectKey) {
            const updatedJourneys = proj.journey.filter((journey, jIndex) => {
              return jIndex !== parseInt(journeyData.journeyindex)
            });
            return { ...proj, journey: updatedJourneys };
          }
          return proj;
        });
        setUserData(updateduserData)
      }
        break;
      //Adiciona um passo na journey selecionada
      case 'add-step': {
        const newStep = { step: journeyData.stepindex, description: jValue };
        const updateduserData = userData.projects?.map(proj => {
          if (proj.key === projectKey) {
            const journeyIndex = parseInt(journeyData.journeyindex);
            const updatedJourneys = [...proj.journey];
            updatedJourneys[journeyIndex].steps.push(newStep);

            return { ...proj, journey: updatedJourneys };
          }
          return proj;
        });
        setUserData(updateduserData);

      }
        break;
      default: console.log('Operacao desconhecida')
    }
    setJourneyData({})
    handleRemove('journey')
    console.log(operationType, userData)
  }

  return (
    <div
      className={"modal show "}
      style={{ display: journeyModal ? 'block' : 'none', position: 'absolute', background: '#00000080', height: bodyHeight }}
    >
      <Modal.Dialog style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton onClick={() => {
          handleRemove('journey')
          setJourneyData({})
        }
        }>

          <Modal.Title> {getTitle()} </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {(operation !== 'remove-journey') &&
          <Form.Control
            value={jValue}
            type="text"
            onChange={(e) => setJValue(e.target.value)}
            onKeyUp={(e) => { if (e.key === 'Enter') updateJourney() }}
            placeholder={getPlaceholder()}
            style={{ cursor: 'text' }}
          />}

        </Modal.Body>

        <Modal.Footer>
          {(operation !== 'add-step') && <RemoveButton
            handleRemove={handleRemove}
            type={removeType}
            updateJourney={updateJourney}
          />}
          <Button variant="primary"
            onClick={() => updateJourney()}
          >Salvar</Button>


        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

const AddUserStories = ({ userData, setUserData, storyData, setStoryData, handleRemove, storyModal, projectKey }) => {
  const [sValue, setSValue] = useState('')
  const [sType, setSType] = useState('user')
  const [operation, setOperation] = useState('')
  const [edit, setEdit] = useState(false)

  //Adiciona efeitos caso as variaveis mudem
  useEffect(() => {
    //Define sValue para ser o titulo da story clicada

    let foundStory = null;
    userData.forEach(proj => {
      if (proj.key === projectKey) {
        proj.stories.forEach(story => {
          if (story.id === storyData) {
            foundStory = story;
          }
        });
      }
    })
    setSValue(foundStory?.title)
  }, [storyData, storyModal])

  //Define o tipo de operação
  useEffect(() => {
    if (storyData !== '') setOperation('description')
    else setOperation('name')
  }, [storyData, operation, sValue]);
  //Deixa o campo sValue e o storyData vazios após o modal se fechar
  useEffect(() => {
    if (storyModal === false) { setSValue(''); setStoryData('') }
  }, [storyModal])




  //Renumerar os ids das userstories
  const renumberStories = (stories) => {
    // Separar stories por tipo
    const userStories = stories.filter(story => story.id.startsWith('US'));
    const systemStories = stories.filter(story => story.id.startsWith('SS'));

    // Ordenar e renumerar US
    const numberedUserStories = userStories
      .sort((a, b) => {
        const idA = parseInt(a.id.replace('US', ''));
        const idB = parseInt(b.id.replace('US', ''));
        return idA - idB;
      })
      .map((story, index) => ({
        ...story,
        id: `US${(index + 1).toString().padStart(2, '0')}`
      }));

    // Ordenar e renumerar SS  
    const numberedSystemStories = systemStories
      .sort((a, b) => {
        const idA = parseInt(a.id.replace('SS', ''));
        const idB = parseInt(b.id.replace('SS', ''));
        return idA - idB;
      })
      .map((story, index) => ({
        ...story,
        id: `SS${(index + 1).toString().padStart(2, '0')}`
      }));

    // Combinar os arrays mantendo a ordem
    return [...numberedUserStories, ...numberedSystemStories];
  };
  //Atualiza os valores do array userStory    
  const updateUserStory = (op) => {
    const operationType = (op ? op : operation)

    switch (operationType) {
      //Adiciona uma nova STORY
      case 'name': {
        console.log(sValue, sType)
        const updateduserData = userData.projects?.map(proj => {
          if (proj.key === projectKey) {
            const newStory = {
              id: sType === 'user' ?
                `US${(proj.stories.length + 1).toString().padStart(2, '0')}`
                : `SS${(proj.stories.length + 1).toString().padStart(2, '0')}`,
              title: sValue,
              type: sType
            };

            const updatedStories = renumberStories([
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
        setUserData(updateduserData);
      }
        break;
      //Altera a descrição da story
      case 'description': {
        const updateduserData = userData.projects?.map(proj => {
          if (proj.key === projectKey) {
            const updatedStories = proj.stories.map((story) => {
              if (story.id === storyData) {
                return { ...story, title: sValue, type: sType }
              }
              return story
            })
            return { ...proj, stories: updatedStories }
          }
          return proj
        })
        setUserData(updateduserData)
      }
        break;
      //Remove a story
      case 'remove': {
        const updateduserData = userData.projects?.map(proj => {
          if (proj.key === projectKey) {
            const updatedStories = proj.stories.filter(story => {
              return story.id !== storyData
            })
            return { ...proj, stories: renumberStories(updatedStories) }
          }
          return proj
        })
        setUserData(updateduserData)
      }
        break;
      default: console.log('Operacao desconhecida')
        break;
    }
    setStoryData('')
    setSValue('')
    handleRemove('userStory')

  }

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
            value={sValue}
            onChange={(e) => setSValue(e.target.value)}
            onKeyUp={(e) => { if (e.key === 'Enter') updateUserStory() }}
            placeholder="Eu como..."
            style={{ cursor: 'text' }}
          />
          <>Tipo de story</>
          <select
            value={sType}
            onChange={(e) => setSType(e.target.value)}
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