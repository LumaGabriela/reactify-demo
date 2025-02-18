import { AddButton } from '../components/button/Buttons'
import './Usuarios.css'

const Usuarios = ({ users, handleRemove }) => {    
  return (
    <div className="users-container">
      <h1>Gerenciamento de Usuários</h1>
      
      <div className="users-grid">
        {users?.map(user => (
          <div key={user.key} className={`user-card ${user.role}`}>
            <>{user.name}</>
            <span className="user-role">{user.role}</span>
          </div>
        ))}
      </div>
      <AddButton
      handleRemove={handleRemove}
      type={'user'}
      />
    </div>
  )
}

export default Usuarios