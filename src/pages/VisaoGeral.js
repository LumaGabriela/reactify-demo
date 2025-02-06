import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import './VisaoGeral.css'
import { useNavigate } from 'react-router'

const VisaoGeral = ({ modalKey, projectData }) => {
  const project = projectData.find(project => project.key === modalKey)
  const navigate = useNavigate()
  return (
    <Container className="visao-geral-container">
      <h1 className="visao-geral-title">Visão Geral</h1>
      <div className="visao-geral-buttons">
        {project && (
          <>
            <Button variant="primary" className="visao-geral-button bg-purple">
              Goal Sketchs
            </Button>
            <Button variant="primary" className="visao-geral-button bg-danger"
            onClick={() => navigate('/user-stories')}>
              User Stories
            </Button>
            <Button variant="primary" className="visao-geral-button bg-purple">
              Personas
            </Button>
            <Button variant="primary" className="visao-geral-button bg-purple">
              Journeys
            </Button>
          </>
        )}
      </div>
    </Container>
  )
}

export default VisaoGeral