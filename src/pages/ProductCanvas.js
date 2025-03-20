import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './ProductCanvas.css';

const ProductCanvas = ({ users, setUsers, userKey, projectKey }) => {
  const [currentProductCanvas, setCurrentProductCanvas] = useState(null)

  useEffect(() => {
    const user = users.find(user => user.key === userKey);
    setCurrentProductCanvas(user?.projects.find(project => project.key === projectKey)?.productCanvas || {})
    }, [users, userKey, projectKey])

  //Adiciona um campo extra no array selecionado
  const handleAdd = (prop) => {
    setCurrentProductCanvas(prevState => ({
      ...prevState,
      [prop]: [...prevState[prop], '']
    }))
    
  }
//Remove o campo selecionado 
  const handleRemove = (prop, index) => {
    setCurrentProductCanvas(prevState => ({
      ...prevState,
      [prop]: prevState[prop].filter((_, i) => i !== index)
    }))
  }
//altera o valor do campo preenchido no objeto currentProductCanvas
  const handleChange = (prop, index, value) => {
    setCurrentProductCanvas(prevState => {
      const newList = [...prevState[prop]];
      newList[index] = value;
      return {
        ...prevState,
        [prop]: newList
      }
    })
  }
  //salva o novo product canvas dentro de users[index].projects.productCanvas
  const handleSave = () => {
    const updatedUsers = users.map(user => {
      if (user.key === userKey) {
        return {
          ...user,
          projects: user.projects.map(project =>
            project.key === projectKey ? { ...project, productCanvas: currentProductCanvas } : project
          )
        }
      }
      return user
    })
    setUsers(updatedUsers)
  }
  //Define o titulo do bloco automaticamente
  const handleTitle = type => {
    switch (type) {
      case 'issues': return 'Problemas'
      case 'solutions': return 'Solução'
      case 'personas': return 'Personas'
      case 'restrictions': return 'Restrições'
      case 'is': return 'É'
      case 'isNot': return 'Não é'
      default: return ''
    }
  }

  if (!currentProductCanvas) return null;

  return (
    <Container fluid className="p-4 product-canvas">
      <Card>
        <Card.Header as="h5" className="bg-purple text-white">
          Nome do Produto: {currentProductCanvas.name}
        </Card.Header>
        <Card.Body>
          <div className="product-canvas-container">
            {['issues', 'solutions', 'personas', 'restrictions', 'is', 'isNot'].map((section, idx) => (
              <div key={idx} className={"product-canvas-item " + section}>
                <h5>{handleTitle(section)}:</h5>
                {currentProductCanvas[section]?.map((item, index) => (
                  <div key={index} className='btn-container'>
                    <Form.Control
                      type="text"
                      value={item}
                      onChange={(e) => handleChange(section, index, e.target.value)}
                    />
                    <Button variant="danger" onClick={() => handleRemove(section, index)}>-</Button>
                  </div>
                ))}
                {(section === 'solutions' && currentProductCanvas.solutions.length === 0) 
                && <Button variant="primary" className='d-flex justify-content-end mt-auto ms-auto ' onClick={() => handleAdd(section)}>+</Button>}
                {(section !== 'solutions' ) 
                && <Button variant="primary"className='d-flex justify-content-end mt-auto ms-auto ' onClick={() => handleAdd(section)}>+</Button>}
              </div>
            ))}
            
          </div>
         
        </Card.Body>
      </Card>
      <Button variant="success" className="d-flex justify-content-end mt-auto ms-auto save-btn" onClick={handleSave}>Salvar</Button>
    </Container>
  );
};

export default ProductCanvas;