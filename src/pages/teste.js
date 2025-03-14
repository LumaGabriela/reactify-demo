const AddGoalSketch = ({ userData, setUserData, userKey, users, setUsers, goalData, setGoalData, handleRemove, modal, projectKey }) => {
  const [gTitle, setGTitle] = useState('')
  const [gType, setGType] = useState('user')
  const [operation, setOperation] = useState('')

  // Adiciona efeitos caso as variáveis mudem
  useEffect(() => {
    // Define gTitle para ser o título da goal clicada
    let foundGoal = null;
    userData.projects.forEach(proj => {
      if (proj.key === projectKey) {
        proj.goalSketch.forEach(goal => {
          if (goal.id === goalData) {
            foundGoal = goal;
          }
        });
      }
    })
    setGTitle(foundGoal?.title)
  }, [goalData, modal.goalSketch])

  // Define o tipo de operação
  useEffect(() => {
    if (goalData !== '') setOperation('description')
    else setOperation('name')
  }, [goalData, operation, gTitle]);

  // Deixa o campo gTitle e o goalData vazios após o modal se fechar
  useEffect(() => {
    if ( modal.goalSketch === false) { setGTitle(''); setGoalData('') }
  }, [ modal.goalSketch])



  // Atualiza os valores do array goalSketch    
  const updateGoalSketch = (op) => {
    const operationType = (op ? op : operation)

    switch (operationType) {
      // Adiciona uma nova Goal
      case 'name': {
        const updateGoalData = {
          ...userData,
          projects: userData.projects.map(proj => {
            if (proj.key === projectKey) {
              const newGoal = {
                id: gType === 'user' ?
                  `US${(proj.goalSketch.length + 1).toString().padStart(2, '0')}`
                  : `SS${(proj.goalSketch.length + 1).toString().padStart(2, '0')}`,
                title: gTitle,
                type: gType
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
        setUserData(updateGoalData);

  // Update user in users array
  const updatedUsers = users.map(user => 
    user.key === userKey ? { ...user, projects: updateGoalData.projects } : user
  );
  setUsers(updatedUsers);;
      }
        break;

      // Altera a descrição da goal
      case 'description': {
        const updateGoalData = {
          ...userData,
          projects: userData.projects.map(proj => {
            if (proj.key === projectKey) {
              const updatedGoals = proj.goalSketch.map((goal) => {
                if (goal.id === goalData) {
                  return { ...goal, title: gTitle, type: gType }
                }
                return goal
              })
              return { ...proj, goalSketch: updatedGoals }
            }
            return proj
          })
        };
        setUserData(updateGoalData);

  // Update user in users array
  const updatedUsers = users.map(user => 
    user.key === userKey ? { ...user, projects: updateGoalData.projects } : user
  );
  setUsers(updatedUsers);
      }
        break;

      // Remove a goal
      case 'remove': {
        const updateGoalData = {
          ...userData,
          projects: userData.projects.map(proj => {
            if (proj.key === projectKey) {
              const updatedGoals = proj.goalSketch.filter(goal => {
                return goal.id !== goalData
              })
              return { ...proj, goalSketch: updatedGoals }
            }
            return proj
          })
        };
        setUserData(updateGoalData);

  // Update user in users array
  const updatedUsers = users.map(user => 
    user.key === userKey ? { ...user, projects: updateGoalData.projects } : user
  );
  setUsers(updatedUsers);
      }
        break;

      default: console.log('Operação desconhecida')
        break;
    }
    setGoalData('')
    setGTitle('')
    handleRemove('goalSketch')
  }

  return (
    <div
      className={"modal show "}
      style={{ display:  modal.goalSketch ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
    >
      <Modal.Dialog style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton onClick={() => handleRemove('goalSketch')}>
          <Modal.Title>Adicionar Goal Sketch</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <>Título da Goal</>
          <Form.Control
            type="text"
            value={gTitle}
            onChange={(e) => setGTitle(e.target.value)}
            onKeyUp={(e) => { if (e.key === 'Enter') updateGoalSketch() }}
            placeholder="Eu como..."
            style={{ cursor: 'text' }}
          />
          <>Tipo de goal</>
          <select
            value={gType}
            onChange={(e) => setGType(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="BG">Business Goal</option>
            <option value="CG">Constraint Goal</option>
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