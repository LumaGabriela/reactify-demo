import { useParams, useNavigate } from 'react-router-dom'
import { Modal, Card, Container, Form, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { RemoveButton, SaveButton } from '../components/button/Buttons'

const UserModal = ({modal, handleRemove, removeUser}) => {
  return (
    <div
      className={"modal show "}
      style={{ display: modal.userRemove ? 'block' : 'none', position: 'absolute', background: '#00000080' }}
    >
      <Modal.Dialog style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton onClick={() => handleRemove('user')}>
          <Modal.Title>Deseja remover este usuário?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" >Salvar</Button>
          <Button variant='primary' onClick={removeUser}>Remover</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
const Usuario = ({ users, setUsers, user, setUser, modal, handleRemove, setUserKey, userKey }) => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({ ...user })

  //caso nao haja usuario, navega em direcao a pagina principal
  useEffect(() => {
    if (!userKey) {
      navigate('/admin/usuarios/');
    }
  }, [user, navigate]);
  //redefine o valor do usuario atual sempre que o objeto users se alterar
  useEffect(() => {
    setCurrentUser({...user})
  }, [user])
//
useEffect(() => {
  setUserKey(userId)
}, [userKey])

  // Atualiza os valores do current user
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
  //Editar e salvar infos do usuario
  const updateUser = () => {
    const updatedUsers = users.map(u =>
      u.key === currentUser.key ? currentUser : u
    )
    setUsers(updatedUsers)
    navigate('/admin/usuarios')
  }
  const removeUser = () => {
    const updatedUsers = users.filter(u => u.key !== currentUser.key);
    setUsers(updatedUsers)
    setUserKey(null)
    navigate('/admin/usuarios')
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
              <Form.Control type="text" defaultValue={user?.name} onChange={(e) => updateCurrentUser('name', e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ID do Usuário</Form.Label>
              <Form.Control type="text" defaultValue={user?.key} onChange={(e) => updateCurrentUser('key', e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Função</Form.Label>
              <Form.Select defaultValue={user?.role} onChange={(e) => updateCurrentUser('role', e.target.value)}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Permissões</Form.Label>
              {user?.permissions && Object.entries(user.permissions).map(([key, value]) => (
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
            <RemoveButton
            handleRemove={handleRemove}
            type={'userRemove'}
            />
          </Form>
        </Card.Body>
      </Card>
      <UserModal
      modal={modal}
      handleRemove={handleRemove}
      removeUser={removeUser}
      />
    </Container>
  );
}

export default Usuario