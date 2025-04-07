import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './ProductCanvas.css';

const ProductCanvas = ({ users, setUsers, userKey, projectKey }) => {
  const [currentProductCanvas, setCurrentProductCanvas] = useState(null)
  //Alterna entre o modo de visualizacao e edicao
  const [viewMode, setViewMode] = useState(true)

  useEffect(() => {
    const user = users.find(user => user.key === userKey);
    setCurrentProductCanvas(user?.projects.find(project => project.key === projectKey)?.productCanvas || {})
    }, [users, userKey, projectKey])


  //Adiciona um campo extra no array selecionado
  const handleAdd = prop => {
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
    <Container 
      fluid 
      className="p-4 product-canvas d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: '80vh' }} /* Ajuste a altura conforme necessário */
    >
        <h1 className='title'>Product Canvas</h1>
        {/* Container do modo de edicao  */}
        <div 
            className="product-canvas-card project-container gap-3"
            style={{ display: viewMode ? 'none' : 'grid' }}
          >
            {['issues', 'solutions', 'personas', 'restrictions', 'is', 'isNot'].map((section, idx) => (
              <div key={idx} className={`product-canvas-item card ${section}`}>
                <div className="card-body d-flex flex-column h-100"> {/* Container flexível */}
                  <h5 className="card-title mb-3">{handleTitle(section)}</h5> {/* Título estilizado */}
                  
                  <div className="mb-3"> {/* Container dos inputs */}
                    {currentProductCanvas[section]?.map((item, index) => (
                      <div key={index} className="input-group mb-2"> {/* Grupo input + botão */}
                        <Form.Control
                          type="text"
                          value={item}
                          onChange={(e) => handleChange(section, index, e.target.value)}
                          className="form-control-sm"
                        />
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleRemove(section, index)}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Botão de adicionar */}
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    className="mt-auto align-self-end" 
                    onClick={() => handleAdd(section)}
                  >
                    <i className="bi bi-plus"></i> Adicionar
                  </Button>
                </div>
              </div>
            ))}
          </div>
      {/* Container do modo de visualização */}
      <div className="product-canvas-card project-container
      gap-3"
        style={{display: !viewMode ? 'none' : 'grid'}}>
     
            {['issues', 'solutions', 'personas', 'restrictions', 'is', 'isNot'].map((section, idx) => (
              <div key={idx} className={`product-canvas-item card ${section}`}>
                <div className="card-body"> {/* Adicione esta div */}
                  <h5 className="card-title">{handleTitle(section)}</h5>
                  <ul className="list-unstyled">
                    {currentProductCanvas[section]?.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                  ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>


  <div className='btn-container'>
      <Button className='modo-visualizacao'
      onClick={()=> 
        viewMode ? setViewMode(false) : setViewMode(true)}>{viewMode ? 'Modo de edição' : 'Modo de visualização'}</Button>

      <Button variant="success" className=" save-btn" onClick={handleSave}>Salvar</Button>

  </div>
      
    </Container>
  );
};

export default ProductCanvas;