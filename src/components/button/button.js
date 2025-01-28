import Button from 'react-bootstrap/Button';

const AddButton = ({handleRemove}) => {
  return (
    <>
      <Button id='addProject' className="" variant="primary" onClick={ () => handleRemove()}>Add</Button>
    
    </>
  );
}

export { AddButton }