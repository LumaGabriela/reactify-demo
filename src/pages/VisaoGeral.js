import React from 'react'
import { useParams } from 'react-router'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import './VisaoGeral.css'
import { useNavigate } from 'react-router'
import { FormControl } from 'react-bootstrap'

const VisaoGeral = ({ projectKey, userData }) => {
  const { projectId } = useParams();
  const project = userData.projects?.find(project => project.key === projectId)
  const navigate = useNavigate()

  return (
    <Container className="visao-geral-container">
      <h1 className="visao-geral-title">Visão Geral</h1>
      <h3>Descreva o projeto</h3>
      <FormControl
      style={{ cursor: 'text' }}
      type='text'
      placeholder='Este projeto...'
      />

      <div className="visao-geral-buttons">
        {project && (
          <>
            <Button variant="primary" className="visao-geral-button bg-purple"
            onClick={() => navigate('/goal-sketch')}>
              Goal Sketchs
            </Button>
            <Button variant="primary" className="visao-geral-button bg-purple"
            onClick={() => navigate('/user-stories')}>
              User Stories
            </Button>
            <Button variant="primary" className="visao-geral-button bg-purple"
            onClick={() => navigate('/personas')}>
              Personas
            </Button>
            <Button variant="primary" className="visao-geral-button bg-purple"
            onClick={() => navigate('/journeys')}>
              Journeys
            </Button>
          </>
        )}
      </div>
    </Container>
  )
}

export default VisaoGeral