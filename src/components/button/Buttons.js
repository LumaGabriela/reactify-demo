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


export { AddButton }