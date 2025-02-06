import { AddButton } from '../components/button/Buttons'
import { AddUserStories } from '../components/modal/Modals'

const UserStories = ({  projectData, setProjectData, storyModal, handleRemove, modalKey,  }) => {  
  return (
    <div>
      <h2>User Story</h2>
      <p></p>
      <AddButton 
      handleRemove={handleRemove}
      type={'userStory'}
      />
      <AddUserStories
        projectData={projectData} 
        setProjectData={setProjectData}
        storyModal={storyModal}
        handleRemove={handleRemove}
        modalKey={modalKey}
      />
    </div>
  );
}

export default UserStories