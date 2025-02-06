import {AddProjectModal} from '../components/modal/Modals'
import { AddButton } from '../components/button/Buttons'
import { ProjectIcon } from '../components/projects/Icons'

const  Home = ({
    isProjectVisible,
    setIsProjectVisible,
    projectData,
    setProjectData,
    handleRemove,
    descriptionModal,
    setDescriptionModal,
    modalKey,
    setModalKey
  }) => {
  return (
    <div>
      <AddProjectModal 
      isVisible={isProjectVisible}
      setIsVisible={setIsProjectVisible}
      projectData={projectData}
      setProjectData={setProjectData}
      handleRemove={handleRemove}
      />

      <AddButton
      type={'project'}
      setIsProjectVisible={setIsProjectVisible}
      handleRemove={handleRemove}
      />
      <ProjectIcon
      projectData={projectData}
      descriptionModal={descriptionModal}
      setModalKey={setModalKey}
      handleRemove={handleRemove}
      type={'description'}
      />  
    </div>
  )
}
export default Home