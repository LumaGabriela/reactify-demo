import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './VisaoGeral.css';
import { useNavigate } from 'react-router';
import { FormControl, Card } from 'react-bootstrap';
import { RemoveButton, SaveButton } from '../components/button/Buttons';
import { useState } from 'react';

const VisaoGeral = ({ users, setUsers, userKey }) => {
  const { projectId } = useParams()
  const [description, setDescription] = useState('')
  const user = users.find(user => user.key === userKey)
  const [project, setProject] = useState(user.projects?.find(project => project.key === projectId))
  const navigate = useNavigate()
  //
  useEffect(() => {
    setProject(user.projects?.find(project => project.key === projectId))
    setDescription(project?.visaoGeral)
  }
    , [users])
  //salva a descricao atual no usuario atual e dentro de users
  const handleSave = () => {
    const updatedProjects = user.projects.map(proj =>
      proj.key === projectId ? { ...proj, visaoGeral: description } : proj
    )

    const updatedUserData = { ...user, projects: updatedProjects };

    const updatedUsers = users.map(user =>
      user.key === user.key ? updatedUserData : user
    )

    setUsers(updatedUsers);
  }
  //limpa o campo descricao
  const cleanDescription = () => setDescription('')
  return (
    <Container className="visao-geral-container">

      <div className="visao-geral-cards">
        {project && (
          <>
            <Card className='visaogeral product-canvas' style={{ width: '18rem' }}>

              <Card.Body>
                <Card.Title>Product Canvas</Card.Title>
                <Card.Text>
                  Infomações essenciais sobre o projeto
                </Card.Text>
              </Card.Body>
              <Card.Footer onClick={() => navigate(`/${projectId}/product-canvas`)}>Visualizar</Card.Footer>
            </Card>

            <Card className='visaogeral product-canvas' style={{ width: '18rem' }}>

              <Card.Body>
                <Card.Title>Personas</Card.Title>
                <Card.Text>
                  x Personas
                </Card.Text>
              </Card.Body>
              <Card.Footer onClick={() => navigate(`/${projectId}/personas`)}>Visualizar</Card.Footer>
            </Card>

            <Card className='visaogeral product-canvas' style={{ width: '18rem' }}>

              <Card.Body>
                <Card.Title>Goal Sketches</Card.Title>
                <Card.Text>
                  Infomações essenciais sobre o projeto
                </Card.Text>
              </Card.Body>
              <Card.Footer onClick={() => navigate(`/${projectId}/goal-sketches`)}>Visualizar</Card.Footer>
            </Card>

            <Card className='visaogeral product-canvas' style={{}}>

              <Card.Body>
                <Card.Title>Journeys</Card.Title>
                <Card.Text>
                  Infomações essenciais sobre o projeto
                </Card.Text>
              </Card.Body>
              <Card.Footer onClick={() => navigate(`/${projectId}/journeys`)}>Visualizar</Card.Footer>
            </Card>
            <Card className='visaogeral product-canvas' style={{ width: '18rem' }}>

              <Card.Body>
                <Card.Title>User Stories</Card.Title>
                <Card.Text>
                  <h2>{project.stories.length} </h2>
                </Card.Text>
              </Card.Body>
              <Card.Footer onClick={() => navigate(`/${projectId}/product-canvas`)}>Visualizar todas</Card.Footer>
            </Card>
          </>
        )}

      </div>
      <h5>Descrição do projeto</h5>
      <div className='btn-container'>
        <FormControl
          style={{ cursor: 'text' }}
          type='text'
          placeholder='Este projeto...'
          value={description}
          onKeyUp={(e) => { if (e.key === 'Enter') handleSave() }}
          onChange={(e) => setDescription(e.target.value)}

        />
        <SaveButton update={handleSave} />
        <RemoveButton
          update={cleanDescription}
          type={'clean'}
        />
      </div>
    </Container>
  )
}

export default VisaoGeral