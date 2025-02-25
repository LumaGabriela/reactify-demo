import { AddProjectModal } from '../components/modal/Modals'
import { AddButton } from '../components/button/Buttons'
import { ProjectIcon } from '../components/projects/Icons'

const Home = ({
  modal,
  userData,
  setUserData,
  handleRemove,
  users,
  setUsers, 
  userKey,
  setProjectKey
}) => {
  return (
    <div>
      <AddProjectModal
        modal={modal}
        userData={userData}
        setUserData={setUserData}
        handleRemove={handleRemove}
        userKey={userKey}
        users={users}
        setUsers={setUsers}
      />

      <AddButton
        type={'project'}
        handleRemove={handleRemove}
      />
      <ProjectIcon
        userData={userData}
        setProjectKey={setProjectKey}
        handleRemove={handleRemove}
      />
    </div>
  )
}
export default Home