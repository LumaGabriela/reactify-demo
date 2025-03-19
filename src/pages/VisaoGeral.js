import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './VisaoGeral.css';
import { useNavigate } from 'react-router';
import { FormControl, Card } from 'react-bootstrap';

import { useState } from 'react';

const VisaoGeral = ({ users, setUsers, userKey }) => {
  const { projectId } = useParams()
  const user = users.find(user => user.key === userKey)
  const [project, setProject] = useState(user.projects?.find(project => project.key === projectId))
  const navigate = useNavigate()

  return (
    <Container className="visao-geral-container">
      <h2>{project?.name}</h2>
      <h5>{project?.visaoGeral} </h5>
      <div className="visao-geral-cards">
        {project && (
          <>
            <Card className='visaogeral'  >

              <Card.Body>
                <Card.Title>Product Canvas</Card.Title>
                <Card.Text>
                  Infomações essenciais sobre o projeto
                </Card.Text>
              </Card.Body>
              <Card.Footer onClick={() => navigate(`/${projectId}/product-canvas`)}>Visualizar</Card.Footer>
            </Card>

            <Card className='visaogeral'  >

              <Card.Body>
                <Card.Title>Personas</Card.Title>
                <Card.Text>
                  {project?.personas?.length} Personas
                </Card.Text>
              </Card.Body>
              <Card.Footer onClick={() => navigate(`/${projectId}/personas`)}>Visualizar</Card.Footer>
            </Card>

            <Card className='visaogeral'  >

              <Card.Body>
                <Card.Title>Goal Sketches</Card.Title>
                <Card.Text>
                  {project?.goalSketch?.length} Goal Sketches
                </Card.Text>
              </Card.Body>
              <Card.Footer onClick={() => navigate(`/${projectId}/goal-sketches`)}>Visualizar</Card.Footer>
            </Card>

            <Card className='visaogeral'>

              <Card.Body>
                <Card.Title>Journeys</Card.Title>
                <Card.Text>
                 {project?.journeys?.length} Journeys
                </Card.Text>
              </Card.Body>
              <Card.Footer onClick={() => navigate(`/${projectId}/journeys`)}>Visualizar</Card.Footer>
            </Card>
            <Card className='visaogeral'  >

              <Card.Body>
                <Card.Title>User Stories</Card.Title>
                <Card.Text>
                 {project?.stories?.length} Stories
                </Card.Text>
              </Card.Body>
              <Card.Footer onClick={() => navigate(`/${projectId}/user-stories`)}>Visualizar todas</Card.Footer>
            </Card>
          </>
        )}

      </div>
      

    </Container>
  )
}

export default VisaoGeral