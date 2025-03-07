import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './VisaoGeral.css';
import { useNavigate } from 'react-router';
import { FormControl } from 'react-bootstrap';
import { RemoveButton, SaveButton } from '../components/button/Buttons';
import { useState } from 'react';

const VisaoGeral = ({ userData, users, setUsers }) => {
  const { projectId } = useParams()
  const [description, setDescription] = useState('')
  const [project, setProject] = useState(userData.projects?.find(project => project.key === projectId))
  const navigate = useNavigate()
  //
  useEffect(()=> {
    setProject(userData.projects?.find(project => project.key === projectId))
    setDescription(project?.visaoGeral)
  }
  ,[users])
//salva a descricao atual no usuario atual e dentro de users
  const handleSave = () => {
    const updatedProjects = userData.projects.map(proj =>
      proj.key === projectId ? { ...proj, visaoGeral: description } : proj
    )

    const updatedUserData = { ...userData, projects: updatedProjects };

    const updatedUsers = users.map(user =>
      user.key === userData.key ? updatedUserData : user
    )

    setUsers(updatedUsers);
  }
  //limpa o campo descricao
const cleanDescription = () => setDescription('')
  return (
    <Container className="visao-geral-container">
      <h1 className="visao-geral-title">Visão Geral</h1>
      <h3>Descreva o projeto</h3>
      <div className='btn-container'>
        <FormControl
          style={{ cursor: 'text' }}
          type='text'
          placeholder='Este projeto...'
          value={description}
          onKeyUp={(e) => {if (e.key === 'Enter') handleSave()} }
          onChange={(e) => setDescription(e.target.value)}
          
        />
        <SaveButton update={handleSave} />
        <RemoveButton 
        update={cleanDescription}
        type={'clean'}/>
      </div>
      <div className="visao-geral-buttons">
        {project && (
          <>
          <Button variant="primary" className="visao-geral-button bg-purple"
              onClick={() => navigate(`/${projectId}/product-canvas`)}>
              Product Canvas
            </Button>
            <Button variant="primary" className="visao-geral-button bg-purple"
              onClick={() => navigate(`/${projectId}/personas`)}>
              Personas
            </Button>
            <Button variant="primary" className="visao-geral-button bg-purple"
              onClick={() => navigate(`/${projectId}/goal-sketches`)}>
              Goal Sketchs
            </Button>
            {/* <Button variant="primary" className="visao-geral-button bg-purple"
              onClick={() => navigate(`/${projectId}/user-stories`)}>
              User Stories
            </Button> */}
            <Button variant="primary" className="visao-geral-button bg-purple"
              onClick={() => navigate(`/${projectId}/journeys`)}>
              Journeys
            </Button>
          </>
        )}
      </div>
    </Container>
  )
}

export default VisaoGeral