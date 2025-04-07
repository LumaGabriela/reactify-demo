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
              colorName={'lilac'}
            />

            <ProgressIcon
              value={project?.goalSketches.length}
              label={'Goal Sketches'}
              link={`/${projectId}/goal-sketches`}
              colorName={'lilac'}
            />
            <ProgressIcon
              value={project?.stories.length}
              label={'Estórias'}
              link={`/${projectId}/stories`}
              colorName={'lilac'}
            />
            <ProgressIcon
              value={project?.journeys.length}
              label={'Journeys'}
              link={`/${projectId}/journeys`}
              colorName={'lilac'}
            />

          </>

        )}

      </div>

      <div className='visaogeral-cards 
      project-container
      gap-3'
      >
        <Card className='visaogeral card-body card-gradient'
        onClick={() => navigate(`/${projectId}/product-canvas`)}>

          <Card.Body>
            <h4 className="custom-card-title card-title mb-3">{project.name}</h4>
            {/* <Card.Title className="custom-card-title ">{project?.name}</Card.Title> */}
            <Card.Text className="custom-card-text">
              {project?.visaoGeral}
            </Card.Text>

          </Card.Body>

        </Card>

        <Card className='visaogeral card-body card-gradient' onClick={() => navigate(`/${projectId}/product-canvas`)} >
          <Card.Body>
            <h4 className="custom-card-title card-title mb-3">Solução para a demanda</h4>
            {/* <Card.Title className="custom-card-title">Solução para a demanda</Card.Title> */}
            <Card.Text className="custom-card-text">
              {project?.productCanvas?.solutions}
            </Card.Text>
          </Card.Body>

        </Card>

        <Card className='visaogeral card-body card-gradient' onClick={() => navigate(`/${projectId}/product-canvas`)}>
          <Card.Body>
            <h4 className="custom-card-title card-title mb-3">É</h4>
            {/* <Card.Title className="custom-card-title">
              É :

            </Card.Title > */}
            <Card.Text className="custom-card-text">
            {project?.productCanvas?.is && (
                project?.productCanvas?.is?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              )
              }
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className='visaogeral card-body card-gradient' onClick={() => navigate(`/${projectId}/product-canvas`)}>
          <Card.Body>
            <h4 className="custom-card-title card-title mb-3">Não é</h4>
            {/* <Card.Title className="custom-card-title">
              Não é :

            </Card.Title> */}
            <Card.Text className="custom-card-text">
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