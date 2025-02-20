import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, ListGroup, Badge, Button } from 'react-bootstrap';
import { useEffect } from 'react';

const Usuario = ({ users }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = users.find(user => user.name === userId);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Header as="h5" className="bg-purple text-white">
          <div>

            <Button
              variant="link"
              className="text-white me-3 p-0"
              onClick={() => navigate('/usuarios')}
            >
              ←
            </Button>


            Editar Usuário</div>
        </Card.Header>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Função: </strong>
              <Badge bg={user.role === 'admin' ? 'purple' : 'primary'}>
                {user.role}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ID: </strong>
              {user.key}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Permissões:</strong>
              <ListGroup variant="flush">
                {Object.entries(user.permissions).map(([key, value]) => (
                  <ListGroup.Item key={key}>
                    <strong>{key}: </strong>
                    {typeof value === 'object'
                      ? Object.entries(value).map(([k, v]) => (
                        <Badge
                          key={k}
                          bg={v ? 'success' : 'danger'}
                          className="me-1"
                        >
                          {k}
                        </Badge>
                      ))
                      : <Badge bg={value ? 'success' : 'danger'}>
                        {value.toString()}
                      </Badge>
                    }
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Usuario