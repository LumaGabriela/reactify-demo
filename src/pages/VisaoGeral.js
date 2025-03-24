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
      <h3>{project?.name}</h3>
      <div className="visao-geral-progress">
        {project && (
          <>




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
              label={'Estórias'}
              link={`/${projectId}/stories`}
              colorName={'green'}
            />
            <ProgressIcon
              value={project?.journeys.length}
              label={'Journeys'}
              link={`/${projectId}/journeys`}
              colorName={'red'}
            />

          </>

        )}

      </div>

      <div className='visaogeral-cards'>
        <Card className='visaogeral'  
        onClick={() => navigate(`/${projectId}/product-canvas`)}>

          <Card.Body>
            <Card.Title>{project?.name}</Card.Title>
            <Card.Text>
              {project?.visaoGeral}
            </Card.Text>
            
          </Card.Body>
      
        </Card>

        <Card className='visaogeral' onClick={() => navigate(`/${projectId}/product-canvas`)} >
          <Card.Body>
            <Card.Title>Solução para a demanda</Card.Title>
            <Card.Text>
              {project?.productCanvas?.solutions}
            </Card.Text>
          </Card.Body>

        </Card>

        <Card className='visaogeral' onClick={() => navigate(`/${projectId}/product-canvas`)}>
          <Card.Body>
            <Card.Title>
              É :

            </Card.Title>
            <Card.Text>
            {project?.productCanvas?.is && (
                project?.productCanvas?.is?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              )
              }
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className='visaogeral' onClick={() => navigate(`/${projectId}/product-canvas`)}>
          <Card.Body>
            <Card.Title>
              Não é :

            </Card.Title>
            <Card.Text>
            {project?.productCanvas?.is && (
                project?.productCanvas?.isNot?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              )
              }
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Container>

  )
}

export default VisaoGeral