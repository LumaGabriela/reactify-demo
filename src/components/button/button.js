import Button from 'react-bootstrap/Button'
import React from 'react'
const AddButton = ({handleRemove}) => {
  return (
    <>
      <Button 
      id='addProject' 
      className="position-fixed bottom-0 end-0 m-3 btn-lg" 
      variant="primary" 
      onClick={ () => handleRemove('project')}>Add</Button>
    </>
  );
}

export { AddButton }