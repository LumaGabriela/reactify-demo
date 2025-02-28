import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'

const AddButton = ({ handleRemove, type }) => {
  //Executa a acao de remoção adequada e depois fecha o modal escolhido
  const navigate = useNavigate()
  const handleClick = () => {
    switch (type) {
      case 'project':
        break;
      case 'description':
        break;
      case 'userStory':
        break;
      case 'journey':
        break;
      case 'userRemove':
        break;
      case 'userAdd': navigate('/admin/usuarios/cadastrar')
        break;
      default:
        console.log('Tipo desconhecido:' + type)
    }
    handleRemove(type)
  }

  return (
    <>
      <Button
        id='addProject'
        className="bottom-0 end-0 m-3 "
        variant="primary"
        onClick={() => handleClick()}>
        <div>
          {type === 'project' && <>Adicionar Projeto</>}
          {type === 'description' && <>Adicionar Descrição</>}
          {type === 'journey' && <>Adicionar journey</>}
          {type === 'userStory' && <>Adicionar User Story</>}
          {type === 'userAdd' && <>Adicionar Usuario</>}
        </div>
      </Button>
    </>
  )
}

const RemoveButton = ({ handleRemove, type, update }) => {
  //Executa a acao de remoção adequada e depois fecha o modal escolhido
  const handleClick = () => {
    switch (type) {
      case 'project':
        break;
      case 'description':
        break;
      case 'remove-journey-step':
        update('remove-journey-step');
        break;
      case 'remove-journey':
        update('remove-journey');
        break;
      case 'userStory':
        update('remove');
        break;
      case 'userRemove': break;
      case 'clean':
        update()
        return

      default:
        console.log('Tipo desconhecido:' + type)
    }
    console.log(type)
    handleRemove(type)
  }

  return (
    <>
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
          {type === 'userRemove' && <>Remover</>}
          {type === 'clean' && <>Limpar</>}
        </div>
      </Button>
    </>
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

const SaveButton = ({ update, type }) => {
  return (
    <Button
      className="btn w-30 mt-auto"
      variant="success"
      onClick={() => update(type)}
    >
      Salvar
    </Button>
  )
}

export { AddButton, RemoveButton, EditButton, SaveButton }