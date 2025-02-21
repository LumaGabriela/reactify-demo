import './Usuarios.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AddButton, EditButton } from '../components/button/Buttons'
import { Container, Table, Badge, Card, Nav } from 'react-bootstrap'


const Usuarios = ({ users, handleRemove }) => {
  return (
    <Container fluid className="p-4">
      <Card>
        <Card.Header as="h5" className="bg-purple text-white">
          Gerenciamento de Usuários
          <AddButton
            handleRemove={handleRemove}
            type={'user'}
          />
        </Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr >
                <th>Nome</th>
                <th>Função</th>
                <th>Projetos</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, i) => (
                <tr key={user.key} >
                  <td>{user.name}</td>
                  <td>
                    <Badge bg={user.role === 'admin' ? 'purple' : 'primary'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td>{user.projects?.length || 0}</td>
                  <td>{user.key}</td>
                  <td>
                    <EditButton
                      type={'usuarios'}
                      path={user.key}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>


    </Container>
  )
}

export default Usuarios