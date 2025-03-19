import { AddProjectModal } from '../components/modal/Modals'
import { AddButton } from '../components/button/Buttons'
import { ProjectIcon } from '../components/projects/Icons'

const Home = ({
  modal,
  users,
  handleRemove,
  setUsers,
  userKey,
  setProjectKey
}) => {
  return (
    <div>
      <AddProjectModal
        modal={modal}
        handleRemove={handleRemove}
        userKey={userKey}
        users={users}
        setUsers={setUsers}
      />


      <ProjectIcon
        userKey={userKey}
        users={users}
        setProjectKey={setProjectKey}
        handleRemove={handleRemove}
      />      
      <AddButton
        type={'project'}
        handleRemove={handleRemove}
      />
    </div>
  )
}
export default Home