import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { SaveButton } from '../components/button/Buttons';

const Usuario = ({ users, setUsers }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(() => users.find(user => user.key === userId));
  const [currentUser, setCurrentUser] = useState({ ...user })
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    setUser(() => users.find(user => user.key === userId))
  }, [users])

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  // Atualiza os valores do current user
  const updateCurrentUser = (prop, value) => {
    switch (prop) {
      case 'name': setCurrentUser({ ...currentUser, name: value })
        break
      case 'key': setCurrentUser({ ...currentUser, key: value })
        break
      case 'role': setCurrentUser({ ...currentUser, role: value })
        break
      case 'write': setCurrentUser({ ...currentUser, permissions: { ...currentUser.permissions, write: value } })
        break
      case 'read': setCurrentUser({ ...currentUser, permissions: { ...currentUser.permissions, read: value } })
        break

      default: console.log('Operacao nao encontrada')
    }
  }
  //Editar e salvar infos do usuario
  const updateUser = () => {
    const updatedUsers = users.map(u =>
      u.key === currentUser.key ? currentUser : u
    )
    console.log(updatedUsers)
    setUsers(updatedUsers)
    
  }

  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Header as="h5" className="bg-purple text-white">
          <div>
            <Button
              variant="link"
              className="text-white me-3 p-0"
              onClick={() => navigate('/admin/usuarios')}
            >
              ←
            </Button>
            Editar Usuário
          </div>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Usuário</Form.Label>
              <Form.Control type="text" defaultValue={user.name} onChange={(e) => updateCurrentUser('name', e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ID do Usuário</Form.Label>
              <Form.Control type="text" defaultValue={user.key} onChange={(e) => updateCurrentUser('key', e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Função</Form.Label>
              <Form.Select defaultValue={user.role} onChange={(e) => updateCurrentUser('role', e.target.value)}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Permissões</Form.Label>
              {Object.entries(user.permissions).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <Form.Label>{key}</Form.Label>
                  {typeof value === 'object' ? (
                    Object.entries(value).map(([k, v]) => (
                      <Form.Check
                        key={k}
                        type="switch"
                        id={`${key}-${k}`}
                        label={k}
                        defaultChecked={v}
                        onChange={(e) => updateCurrentUser(key, e.target.checked)}
                      />
                    ))
                  ) : (
                    <Form.Check
                      type="switch"
                      id={key}
                      label={key}
                      defaultChecked={value}
                      onChange={(e) => updateCurrentUser(key, e.target.checked)}
                    />
                  )}
                </div>
              ))}
            </Form.Group>

            <SaveButton updateUser={updateUser} />
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Usuario