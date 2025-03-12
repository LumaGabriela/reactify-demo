import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './ProductCanvas.css';

const Personas = ({ users, setUsers, userKey, projectKey }) => {
  const [currentPersonas, setCurrentPersonas] = useState([]);

  useEffect(() => {
    const user = users.find(user => user.key === userKey);
    setCurrentPersonas(user?.projects.find(project => project.key === projectKey).personas || []);
  }, [users, userKey, projectKey]);

  useEffect(() => {
    console.log(currentPersonas);
  }, [currentPersonas]);

  // Adiciona um novo container para uma nova persona
  const handleAddPersona = () => {
    setCurrentPersonas(prevState => [
      ...prevState,
      { name: 'Nome da Persona', profile: [], expectations: [], restrictions: [], goals: [] }
    ]);
  };

  // Adiciona um campo extra no array selecionado
  const handleAdd = (personaIndex, prop) => {
    setCurrentPersonas(prevState => {
      const newPersonas = [...prevState];
      newPersonas[personaIndex][prop] = [...newPersonas[personaIndex][prop], '']
      console.log(personaIndex, prop)
      return newPersonas;
    });
  };

  // Remove o campo selecionado
  const handleRemove = (personaIndex, prop, index) => {
    setCurrentPersonas(prevState => {
      const newPersonas = [...prevState];
      newPersonas[personaIndex][prop] = newPersonas[personaIndex][prop].filter((_, i) => i !== index);
      return newPersonas;
    });
  };

  // Altera o valor do campo preenchido no objeto currentPersonas
  const handleChange = (personaIndex, prop, index, value) => {
    setCurrentPersonas(prevState => {
      const newPersonas = [...prevState];
      newPersonas[personaIndex][prop][index] = value;
      return newPersonas;
    });
  };

  // Altera o nome da persona
  const handleNameChange = (personaIndex, value) => {
    setCurrentPersonas(prevState => {
      const newPersonas = [...prevState];
      newPersonas[personaIndex].name = value;
      return newPersonas;
    });
  };

  // Remove a persona
  const handleRemovePersona = (personaIndex) => {
    setCurrentPersonas(prevState => prevState.filter((_, i) => i !== personaIndex));
  };

  // Salva o novo product canvas dentro de users[index].projects.productCanvas
  const handleSave = () => {
    const updatedUsers = users.map(user => {
      if (user.key === userKey) {
        return {
          ...user,
          projects: user.projects.map(project =>
            project.key === projectKey ? { ...project, personas: currentPersonas } : project
          )
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleTitle = type => {
    switch (type) {
      case 'profile': return 'Profile/Behaviors';
      case 'expectations': return 'Expectations';
      case 'restrictions': return 'Restrictions';
      case 'goals': return 'Goals';
      default: return '';
    }
  };

  if (!currentPersonas) return null;

  return (
    <Container>
      {currentPersonas.map((persona, personaIndex) => (
        <Container fluid className="p-4" key={personaIndex}>
          <Card>
            <Card.Header as="h5" className="bg-purple text-white">
              Nome:
              <Form.Control
              className='input-name'
                type="text"
                value={persona.name}
                onChange={(e) => handleNameChange(personaIndex, e.target.value)}
              />
              <Button variant="danger" className="d-flex justify-content-end mt-auto ms-auto " onClick={() => handleRemovePersona(personaIndex)}>Remover Persona</Button>
            </Card.Header>
            <Card.Body>
              <div className="product-canvas-container">
                {['profile', 'expectations', 'restrictions', 'goals'].map((section, idx) => (
                  <div key={idx} className={"product-canvas-item " + section}>
                    <h5>{handleTitle(section)}:</h5>
                    {persona[section]?.map((item, i) => (
                      <div key={i} className='btn-container'>
                        <Form.Control
                          type="text"
                          value={item}
                          onChange={(e) => handleChange(personaIndex, section, i, e.target.value)}
                        />
                        <Button variant="danger" onClick={() => handleRemove(personaIndex, section, i)}>-</Button>
                      </div>
                    ))}
                    <Button variant="primary" className='d-flex justify-content-end mt-auto ms-auto' onClick={(e) => {handleAdd(personaIndex, section); console.log()}}>+</Button>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Container>
      ))}
      <Button variant="primary" className="d-flex justify-content-end mt-auto ms-auto " onClick={handleAddPersona}>Adicionar Persona</Button>
      <Button variant="success" className="d-flex justify-content-end mt-auto ms-auto save-btn" onClick={handleSave}>Salvar</Button>
    </Container>
  );
};

export default Personas;