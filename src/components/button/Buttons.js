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

const RemoveButton = ({handleRemove, type}) => {
  return (
    <>
      <Button 
      id='removeProject' 
      className="  m-3 btn-lg" 
      variant="danger" 
      onClick={ () => handleRemove(type)}>
      <div>
      {type === 'project' && <>Remover Projeto</>}
      {type === 'description' && <>Remover Descrição</>}
      {type === 'journey' && <>Remover passo</>}
      {type === 'userStory' && <>Remover User Story</>}
    </div>
      </Button>
    </>
  )
} 


export { AddButton, RemoveButton }