import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import { RemoveButton } from '../button/Buttons'
import './Modals.css'

const AddProjectModal = ({ modal, userKey, users, setUsers, handleRemove }) => {
  const [pName, setPName] = useState('')

  // Salva o nome do projeto no objeto principal
  const setProjectName = () => {
    const user = users.find(user => user.key === userKey);
    const updatedUserData = {
      ...user,
      projects: [...user.projects, {
        name: pName,
        goalSketches: [],
        journey: [],
        productView: 'Visão do produto',
        key: nanoid()
      }]
    }
    setUsers(users.map(user => user.key === userKey ? updatedUserData : user));

  // Update user in users array
  const updatedUsers = users.map(user => 
    user.key === userKey ? { ...user, projects: updatedUserData.projects } : user
  );
  setUsers(updatedUsers);

    setPName('')
    handleRemove('project')
  }

  // Printa os dados do objeto toda vez que ele é alterado


  return (
    <div
      className={"modal show "}
      style={{ display: modal.project ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
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
          <Button variant="primary" onClick={() => setProjectName()}>Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

const JourneyDescriptionModal = ({userKey, users, setUsers, handleRemove, modal, projectKey, journeyData, setJourneyData, operation, setOperation }) => {
  const [jValue, setJValue] = useState('')
  const [removeType, setRemoveType] = useState('')
  const [bodyHeight, setBodyHeight] = useState('100%');

  const [ project, setProject] = useState(null)
  //Atualiza o projeto atual
  useEffect(() => {
    const user = users.find(user => user.key === userKey);
    setProject(user?.projects.find(project => project.key === projectKey) || {});
  }, [users, userKey, projectKey])
  // Torna a altura da sombra do modal variável
  useEffect(() => {
    const height = document.body.scrollHeight;
    setBodyHeight(`${height*1.2}px`)
    // Se o modal está fechado, redefine os valores da journey
    if (!modal.journeys) {
      setJourneyData({})
      setJValue('')
    }
  }, [modal.journeys]);

  // Define o tipo de botão remove
  useEffect(() => {
    switch (operation) {
      case 'remove-journey': setRemoveType(operation)
        break
      case 'description': setRemoveType('remove-journey-step')
        break
      default: setRemoveType('')
    }
  }, [operation])

  // Define o valor de operation
  useEffect(() => {
    // Caso haja valor prévio (remove ou add-step), manter o valor
    if (operation !== '' && Object.keys(journeyData).length !== 0) void 0
    // Caso não e o journeyData tenha valores definidos, operação será atualizar descrição
    else if (Object.keys(journeyData).length !== 0) setOperation('description')
    // Do contrário, a operação será de adicionar uma nova journey
    else setOperation('name')
  }, [journeyData])

  // Seletor de valores para o placeholder
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

  // Seletor de valores para o título
  const getTitle = () => {
    if (operation === 'add-step') {
      return 'Adicionar novo passo';
    } else if (operation === 'description' && Object.keys(journeyData).length > 0) {
      return `Editar passo: ${project.journey[journeyData.journeyindex]?.steps[journeyData.stepindex]?.description}`
    } else if (operation === 'name') {
      return 'Nome da jornada';
    } else if (operation === 'remove-journey') {
      return 'Deseja remover a jornada?'
    }
  }

  // Atualiza o array das journeys
  const updateJourney = (op) => {
    const operationType = (op ? op : operation)
    const user = users.find(user => user.key === userKey);
    switch (operationType) {
      // Adiciona uma journey
      case 'name': {
        const newJourney = {
          name: jValue,
          steps: []
        };


        const updatedUserData = {
          ...user,
          projects: user.projects.map(proj => {
            if (proj.key === projectKey) {
              return { ...proj, journey: [...proj.journey, newJourney] };
            }
            return proj;
          })
        };

        setUsers(users.map(user => user.key === userKey ? updatedUserData : user));


      }
        break;

      // Atualiza a descrição de uma journey
      case 'description': {
        const updatedUserData = {
          ...user,
          projects: user.projects.map(proj => {
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
          })
        };
        setUsers(users.map(user => user.key === userKey ? updatedUserData : user));

      }
        break;

      // Remove um passo de uma journey
      case 'remove-journey-step': {
        const updatedUserData = {
          ...user,
          projects: user.projects.map(proj => {
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
          })
        };
        setUsers(users.map(user => user.key === userKey ? updatedUserData : user));

  // Update user in users array
  const updatedUsers = users.map(user => 
    user.key === userKey ? { ...user, projects: updatedUserData.projects } : user
  );
  setUsers(updatedUsers);;
      }
        break;

      // Remove a journey por inteiro
      case 'remove-journey': {
        const updatedUserData = {
          ...user,
          projects: user.projects.map(proj => {
            if (proj.key === projectKey) {
              const updatedJourneys = proj.journey.filter((journey, jIndex) => {
                return jIndex !== parseInt(journeyData.journeyindex)
              });
              return { ...proj, journey: updatedJourneys };
            }
            return proj;
          })
        };
        setUsers(users.map(user => user.key === userKey ? updatedUserData : user));

  // Update user in users array

      }
        break;

      // Adiciona um passo na journey selecionada
      case 'add-step': {
        const newStep = { step: journeyData.stepindex, description: jValue };
        const updatedUserData = {
          ...user,
          projects: user.projects.map(proj => {
            if (proj.key === projectKey) {
              const journeyIndex = parseInt(journeyData.journeyindex);
              const updatedJourneys = [...proj.journey];
              updatedJourneys[journeyIndex].steps.push(newStep);

              return { ...proj, journey: updatedJourneys };
            }
            return proj;
          })
        };
        setUsers(users.map(user => user.key === userKey ? updatedUserData : user));


      }
        break;

      default: console.log('Operação desconhecida')
    }
    setJourneyData({})
    handleRemove('journey')

  }

  return (
    <div
      className={"modal show "}
      style={{ display: modal.journeys ? 'block' : 'none', position: 'absolute', background: '#00000080', height: bodyHeight }}
    >
      <Modal.Dialog style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton onClick={() => {
          handleRemove('journey')
          setJourneyData({})
        }}>
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
          {(removeType ) && 
          <RemoveButton
            handleRemove={handleRemove}
            type={removeType}
            update={updateJourney}
          />}
          <Button variant="primary" onClick={() => updateJourney()}>Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

const AddUserStories = ({ userData, setUserData, userKey, users, setUsers, storyData, setStoryData, handleRemove, modal, projectKey }) => {
  const [sValue, setSValue] = useState('')
  const [sType, setSType] = useState('user')
  const [operation, setOperation] = useState('')
  const [user, setUser] = useState(null)

  //Atualiza o usuario atual
  useEffect(() => {
    setUser(users.find(user => user.key === userKey))
  }, [users, userKey, projectKey])
  // Adiciona efeitos caso as variáveis mudem
  useEffect(() => {
    // Define sValue para ser o título da story clicada
    let foundStory = null;
    const user = users.find(user => user.key === userKey);
    user.projects.forEach(proj => {
      if (proj.key === projectKey) {
        proj.stories.forEach(story => {
          if (story.id === storyData) {
            foundStory = story;
          }
        });
      }
    })
    setSValue(foundStory?.title)
  }, [storyData, modal.userStories])

  // Define o tipo de operação
  useEffect(() => {
    if (storyData !== '') setOperation('description')
    else setOperation('name')
  }, [storyData, operation, sValue]);

  // Deixa o campo sValue e o storyData vazios após o modal se fechar
  useEffect(() => {
    if ( modal.userStories === false) { setSValue(''); setStoryData('') }
  }, [ modal.userStories])

  // Renumerar os ids das userstories
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

  // Atualiza os valores do array userStory    
  const updateUserStory = (op) => {
    const operationType = (op ? op : operation)

    switch (operationType) {
      // Adiciona uma nova STORY
      case 'name': {
        const updatedUserData = {
          ...user,
          projects: user.projects.map(proj => {
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
          })
        };
        setUsers(users.map(user => user.key === userKey ? updatedUserData : user));
      }
        break;

      // Altera a descrição da story
      case 'description': {
        const updatedUserData = {
          ...user,
          projects: user.projects.map(proj => {
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
        };
        setUserData(updatedUserData);

  // Update user in users array
  const updatedUsers = users.map(user => 
    user.key === userKey ? { ...user, projects: updatedUserData.projects } : user
  );
  setUsers(updatedUsers);
      }
        break;

      // Remove a story
      case 'remove': {
        const updatedUserData = {
          ...user,
          projects: user.projects.map(proj => {
            if (proj.key === projectKey) {
              const updatedStories = proj.stories.filter(story => {
                return story.id !== storyData
              })
              return { ...proj, stories: renumberStories(updatedStories) }
            }
            return proj
          })
        };
        setUserData(updatedUserData);

  // Update user in users array
  const updatedUsers = users.map(user => 
    user.key === userKey ? { ...user, projects: updatedUserData.projects } : user
  );
  setUsers(updatedUsers);
      }
        break;

      default: console.log('Operação desconhecida')
        break;
    }
    setStoryData('')
    setSValue('')
    handleRemove('userStory')
  }

  return (
    <div
      className={"modal show "}
      style={{ display:  modal.userStories ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
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
            update={updateUserStory}
          />
          <Button variant="primary" onClick={() => updateUserStory()}>Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

const AddGoalSketch = ({ userKey, users, setUsers, goalData, setGoalData, handleRemove, modal, projectKey }) => {

  const [goalField, setGoalField] = useState({
    title:'', type: 'BG', priority: 'LOW'
  })
  const [operation, setOperation] = useState('')
  const [user, setUser] = useState(null)

  //Atualiza o usuario atual
  useEffect(() => {
    setUser(users.find(user => user.key === userKey))
  }, [users, userKey, projectKey])

  // Adiciona efeitos caso as variáveis mudem
  useEffect(() => {
    // Define goalField.title para ser o título da goal clicada
    let foundGoal = null
    let user = users.find(user => user.key === userKey)
    user.projects.forEach(proj => {
      if (proj.key === projectKey) {
        proj.goalSketch.forEach(goal => {
          if (goal.id === goalData) {
            foundGoal = goal;
          }
        });
      }
    })
    setGoalField({...goalField, title: foundGoal?.title})
  }, [goalData, modal.goalSketch])

  // Define o tipo de operação
  useEffect(() => {
    if (goalData !== '') setOperation('description')
    else setOperation('name')
  }, [goalData, operation]);

  // Deixa o campo goalField.title e o goalData vazios após o modal se fechar
  useEffect(() => {
    if ( modal.goalSketch === false) { setGoalField({...goalField, title: ''}); setGoalData('') }
  }, [ modal.goalSketch])



  // Atualiza os valores do array goalSketch    
  const updateGoalSketch = (op) => {
    const operationType = (op ? op : operation)

    switch (operationType) {
      // Adiciona uma nova Goal
      case 'name': {
        const updateGoalData = {
          ...user,
          projects: user.projects.map(proj => {
            if (proj.key === projectKey) {
              const newGoal = {
                type: goalField.type, 
                title: goalField.title,
                priority: goalField.priority,
                id: nanoid()
              };

              const updatedGoals = [
                ...proj.goalSketch,
                newGoal
              ]

              return {
                ...proj,
                goalSketch: updatedGoals
              };
            }
            return proj;
          })
        };
        setUsers(users.map(user => user.key === userKey ? updateGoalData : user));
      }
        break;

      // Altera a descrição da goal
      case 'description': {
        const updateGoalData = {
          ...user,
          projects: user.projects.map(proj => {
            if (proj.key === projectKey) {
              const updatedGoals = proj.goalSketch.map((goal) => {
                if (goal.id === goalData) {
                  return { ...goal, title: goalField.title, type: goalField.type, priority: goalField.priority}
                }
                return goal
              })
              return { ...proj, goalSketch: updatedGoals }
            }
            return proj
          })
        };
        setUsers(users.map(user => user.key === userKey ? updateGoalData : user));

      }
        break;

      // Remove a goal
      case 'remove': {
        const updateGoalData = {
          ...user,
          projects: user.projects.map(proj => {
            if (proj.key === projectKey) {
              const updatedGoals = proj.goalSketch.filter(goal => {
                return goal.id !== goalData
              })
              return { ...proj, goalSketch: updatedGoals }
            }
            return proj
          })
        };
        setUsers(users.map(user => user.key === userKey ? updateGoalData : user));
      }
        break;

      default: console.log('Operação desconhecida')
        break;
    }
    setGoalData('')
    setGoalField({...goalField, title: ''})
    handleRemove('goalSketch')
  }

  return (
    <div
      className={"modal show "}
      style={{ display:  modal.goalSketch ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
    >
      <Modal.Dialog style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton onClick={() => handleRemove('goalSketch')}>
          <Modal.Title>
          {goalData === '' && <>Adicionar Goal Sketch</>}
          {goalData !== '' && <>Editar Goal</>}

          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
          <>Título da Goal</>
          <Form.Control
            type="text"
            value={goalField.title}
            onChange={(e) =>setGoalField({...goalField, title: e.target.value})}
            onKeyUp={(e) => { if (e.key === 'Enter') updateGoalSketch() }}
            placeholder="Eu como..."
            style={{ cursor: 'text' }}
          />
          <>Tipo de goal</>
          <select
            value={goalField.type}
            onChange={(e) => setGoalField({...goalField, type: e.target.value})}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="BG">Business Goal</option>
            <option value="CG">Constraint Goal</option>
          </select>
          <>Prioridade da Goal</>
          <select
            value={goalField.priority}
            onChange={(e) => setGoalField({...goalField, priority: e.target.value})}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="LOW">Baixa</option>
            <option value="MED">Média</option>
            <option value="HIGH">Alta</option>
          </select>
        </Modal.Body>

        <Modal.Footer>
          <RemoveButton
            handleRemove={handleRemove}
            type={'goalSketch'}
            update={updateGoalSketch}
          />
          <Button variant="primary" onClick={() => updateGoalSketch()}>Salvar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export { AddProjectModal, JourneyDescriptionModal, AddUserStories, AddGoalSketch }