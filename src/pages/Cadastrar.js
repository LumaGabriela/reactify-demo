import { useNavigate } from 'react-router-dom'
import { Modal, Card, Container, Form, Button } from 'react-bootstrap'
import {  useState } from 'react'
import { nanoid } from 'nanoid'
import {ReactComponent as BackArrow} from '../components/imgs/back-svgrepo-com.svg'
const Cadastrar = ({ users, setUsers }) => {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    key: nanoid(),
    projects: [],
    role: 'user',
    permissions: {
      read: false,
      write: false
    }
  })

  const navigate = useNavigate()
  // Atualiza os valores do current user ao alterar os campos
  const updateCurrentUser = (prop, value) => {
    switch (prop) {
      case 'name': setCurrentUser({ ...currentUser, name: value })
        break
      case 'key':
        // setCurrentUser({ ...currentUser, key: value })
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
  const addUser = () => {
    setUsers([...users, currentUser])
    navigate('/admin/usuarios')
  }

  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Header as="h5" className="bg-purple text-white">
          <div>
            <Button
              variant="link"
              className="text-white me-3 p-0 back-arrow-btn"
              onClick={() => navigate('/admin/usuarios')}
            >
              <BackArrow className='back-arrow'/>
            </Button>
            
            Cadastrar Usuário
          </div>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Usuário</Form.Label>
              <Form.Control type="text" defaultValue={currentUser?.name} onChange={(e) => updateCurrentUser('name', e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Papel</Form.Label>
              <Form.Select defaultValue={currentUser?.role} onChange={(e) => updateCurrentUser('role', e.target.value)}>
                <option value="admin">Administrador</option>
                <option value="customer">Cliente</option>
                <option value="project-manager">Gerente de Projeto</option>
                <option value="domain-expert">Domain Expert</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Permissões</Form.Label>
              {currentUser?.permissions && Object.entries(currentUser.permissions).map(([key, value]) => (
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

          </Form>
          <div className='btn-container'>
          <Button variant="primary" onClick={() => addUser()}>Salvar</Button>
          <Button variant="secondary" onClick={() => navigate('/admin/usuarios')}>Cancelar</Button>
        </div>
        </Card.Body>
        
      </Card>

    </Container>
  )
}

export default Cadastrar