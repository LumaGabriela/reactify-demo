import React, { useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container'
import './VisaoGeral.css';
import { useNavigate } from 'react-router';
import { FormControl, Card } from 'react-bootstrap';
import ProgressIcon from '../components/progressIcon/ProgressIcon';



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

              <ProgressIcon
              value={project?.personas.length}
              label={'Personas'}
              link={`/${projectId}/personas`}
              colorName={'orange'}
              />

            <ProgressIcon
              value={project?.goalSketches.length}
              label={'Goal Sketches'}
              link={`/${projectId}/goal-sketches`}
              colorName={'blue'}
              />      
              <ProgressIcon
              value={project?.stories.length}
              label={'User Stories'}
              link={`/${projectId}/user-stories`}
              colorName={'green'}
              />      
     
          </>
        )}

      </div>
      

    </Container>
  )
}

export default VisaoGeral