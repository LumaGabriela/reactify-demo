import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './ProductCanvas.css';

const ProductCanvas = ({ users, setUsers, userKey, projectKey }) => {
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const user = users.find(user => user.key === userKey);
    setCurrentProject(user?.projects.find(project => project.key === projectKey) || {})
  }, [users, currentProject])

  const handleAdd = (list, setList) => {
    setList([...list, '']);
  };

  const handleRemove = (list, setList, index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const handleChange = (list, setList, index, value) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };

  const handleSave = () => {
    const updatedUsers = users.map(user => {
      if (user.key === userKey) {
        return {
          ...user,
          projects: user.projects.map(project =>
            project.key === projectKey ? { ...project, productCanvas: currentProject } : project
          )
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  if (!currentProject) return null;

  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Header as="h5" className="bg-purple text-white">
          Nome do Produto
        </Card.Header>
        <Card.Body>
          <div className="product-canvas-container">
            <div className="product-canvas-item">
              <h5>PROBLEMAS:</h5>
              {currentProject?.productCanvas?.issues?.map((issue, index) => (
                <div key={index}>
                  <Form.Control
                    type="text"
                    value={issue}
                    onChange={(e) => handleChange(currentProject?.productCanvas?.issues, setCurrentProject, index, e.target.value)}
                  />
                  <Button variant="danger" onClick={() => handleRemove(currentProject?.productCanvas?.issues, setCurrentProject, index)}>-</Button>
                </div>
              ))}
              <Button variant="primary" onClick={() => handleAdd(currentProject?.productCanvas?.issues, setCurrentProject)}>+</Button>
            </div>
            <div className="product-canvas-item">
              <h5>SOLUÇÃO:</h5>
              {currentProject.solutions?.map((solution, index) => (
                <div key={index}>
                  <Form.Control
                    type="text"
                    value={solution}
                    onChange={(e) => handleChange(currentProject?.productCanvas?.solutions, setCurrentProject, index, e.target.value)}
                  />
                  <Button variant="danger" onClick={() => handleRemove(currentProject?.productCanvas?.solutions, setCurrentProject, index)}>-</Button>
                </div>
              ))}
              <Button variant="primary" onClick={() => handleAdd(currentProject?.productCanvas?.solutions, setCurrentProject)}>+</Button>
            </div>
            <div className="product-canvas-item">
              <h5>PERSONAS:</h5>
              {currentProject?.productCanvas?.personas?.map((persona, index) => (
                <div key={index}>
                  <Form.Control
                    type="text"
                    value={persona}
                    onChange={(e) => handleChange(currentProject?.productCanvas?.personas, setCurrentProject, index, e.target.value)}
                  />
                  <Button variant="danger" onClick={() => handleRemove(currentProject?.productCanvas?.personas, setCurrentProject, index)}>-</Button>
                </div>
              ))}
              <Button variant="primary" onClick={() => handleAdd(currentProject?.productCanvas?.personas, setCurrentProject)}>+</Button>
            </div>
            <div className="product-canvas-item">
              <h5>RESTRIÇÕES:</h5>
              {currentProject?.productCanvas?.restrictions?.map((restriction, index) => (
                <div key={index}>
                  <Form.Control
                    type="text"
                    value={restriction}
                    onChange={(e) => handleChange(currentProject?.productCanvas?.restrictions, setCurrentProject, index, e.target.value)}
                  />
                  <Button variant="danger" onClick={() => handleRemove(currentProject?.productCanvas?.restrictions, setCurrentProject, index)}>-</Button>
                </div>
              ))}
              <Button variant="primary" onClick={() => handleAdd(currentProject?.productCanvas?.restrictions, setCurrentProject)}>+</Button>
            </div>
            <div className="product-canvas-item">
              <h5>É:</h5>
              {currentProject?.productCanvas?.is?.map((item, index) => (
                <div key={index}>
                  <Form.Control
                    type="text"
                    value={item}
                    onChange={(e) => handleChange(currentProject?.productCanvas?.is, setCurrentProject, index, e.target.value)}
                  />
                  <Button variant="danger" onClick={() => handleRemove(currentProject?.productCanvas?.is, setCurrentProject, index)}>-</Button>
                </div>
              ))}
              <Button variant="primary" onClick={() => handleAdd(currentProject?.productCanvas?.is, setCurrentProject)}>+</Button>
            </div>
            <div className="product-canvas-item">
              <h5>NÃO É:</h5>
              {currentProject.isNot?.map((item, index) => (
                <div key={index}>
                  <Form.Control
                    type="text"
                    value={item}
                    onChange={(e) => handleChange(currentProject?.productCanvas?.isNot, setCurrentProject, index, e.target.value)}
                  />
                  <Button variant="danger" onClick={() => handleRemove(currentProject?.productCanvas?.isNot, setCurrentProject, index)}>-</Button>
                </div>
              ))}
              <Button variant="primary" onClick={() => handleAdd(currentProject?.productCanvas?.isNot, setCurrentProject)}>+</Button>
            </div>
          </div>
          <Button variant="success" onClick={handleSave}>Salvar</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductCanvas;