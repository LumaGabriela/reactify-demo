import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'

const AddButton = ({ handleRemove, type }) => {

  return (
    <>
      <Button
        id='addProject'
        className="bottom-0 end-0 m-3 "
        variant="primary"
        onClick={() => handleRemove(type)}>
        <div>
          {type === 'project' && <>Adicionar Projeto</>}
          {type === 'description' && <>Adicionar Descrição</>}
          {type === 'journey' && <>Adicionar journey</>}
          {type === 'userStory' && <>Adicionar User Story</>}
          {type === 'user' && <>Adicionar Usuario</>}
        </div>
      </Button>
    </>
  )
}

const RemoveButton = ({ handleRemove, type, updateJourney, updateUserStory }) => {
//Executa a acao de remoção adequada e depois fecha o modal escolhido
  const handleClick = () => {
    switch (type) {
      case 'project':
        break;
      case 'description':
        break;
      case 'remove-journey-step':
        updateJourney('remove-journey-step');
        break;
      case 'remove-journey':
        updateJourney('remove-journey');
        break;
      case 'userStory':
        updateUserStory('remove');
        break;
      case 'user' : break;

      default:
        console.log('Tipo desconhecido:' + type )
    }
    handleRemove(type)
  }

  return (
    <div className="remove-button-container">
      <Button
        className="btn w-30 mt-auto"
        variant="danger"
        onClick={handleClick}
      >
        <div>
          {type === 'project' && <>Remover Projeto</>}
          {type === 'description' && <>Remover Descrição</>}
          {type === 'remove-journey-step' && <>Remover passo</>}
          {type === 'remove-journey' && <>Remover journey</>}
          {type === 'userStory' && <>Remover User Story</>}
          {type === 'user' && <>Remover</>}
        </div>
      </Button>
    </div>
  )
}

const EditButton = ({ path, type }) => {
  const navigate = useNavigate()
  return (
    <Button
      className="btn w-30 mt-auto"
      variant="secondary"
      onClick={() => navigate(`/${type}/${path}`)}
    >
      Editar
    </Button>
  )
}

const SaveButton = ({updateUser, type}) => {
  return (
    <Button
      className="btn w-30 mt-auto"
      variant="success"
      onClick={() => updateUser(type)}
    >
      Salvar
    </Button>
  )
}

export { AddButton, RemoveButton, EditButton, SaveButton }