import Button from 'react-bootstrap/Button'

const AddButton = ({handleRemove, type}) => {
  return (
    <>
      <Button 
      id='addProject' 
      className="position-fixed bottom-0 end-0 m-3 btn-lg" 
      variant="primary" 
      onClick={ () => handleRemove(type)}>
      <div>
      {type === 'project' && <>Adicionar Projeto</>}
      {type === 'description' && <>Adicionar Descrição</>}
      {type === 'journey' && <>Adicionar journey</>}
      {type === 'userStory' && <>Adicionar User Story</>}
    </div>
      </Button>
    </>
  );
}

const RemoveButton = ({ handleRemove, type, updateJourney, updateUserStory}) => {

  const handleClick = () => {
    switch (type) {
      case 'project':
        handleRemove(type);
        break;
      case 'description':
        handleRemove(type);
        break;
      case 'journey':
        handleRemove(type);
        updateJourney('remove');
        break;
      case 'userStory':
        handleRemove(type);
        updateUserStory('remove');
        break;
      default:
        console.log('Tipo desconhecido');
    }
  };

  return (
    <div className="remove-button-container">
      <Button 
        id='removeProject' 
        className="btn w-100 mt-auto" 
        variant="danger" 
        onClick={handleClick}
      >
        <div>
          {type === 'project' && <>Remover Projeto</>}
          {type === 'description' && <>Remover Descrição</>}
          {type === 'journey' && <>Remover passo</>}
          {type === 'userStory' && <>Remover User Story</>}
        </div>
      </Button>
    </div>
  );
}


export { AddButton, RemoveButton }