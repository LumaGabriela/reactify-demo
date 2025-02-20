import { AddProjectModal } from '../components/modal/Modals'
import { AddButton } from '../components/button/Buttons'
import { ProjectIcon } from '../components/projects/Icons'

const Home = ({
  isProjectVisible,
  setIsProjectVisible,
  userData,
  setUserData,
  handleRemove,
  descriptionModal,
  projectKey,
  setProjectKey
}) => {
  return (
    <div>
      <AddProjectModal
        isVisible={isProjectVisible}
        setIsVisible={setIsProjectVisible}
        userData={userData}
        setUserData={setUserData}
        handleRemove={handleRemove}
      />

      <AddButton
        type={'project'}
        setIsProjectVisible={setIsProjectVisible}
        handleRemove={handleRemove}
      />
      <ProjectIcon
        userData={userData}
        descriptionModal={descriptionModal}
        setProjectKey={setProjectKey}
        handleRemove={handleRemove}
        type={'description'}
      />
    </div>
  )
}
export default Home