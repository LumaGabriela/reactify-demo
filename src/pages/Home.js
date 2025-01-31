import {AddProjectModal, ProjectDescriptionModal} from '../components/modal/modal'
import { AddButton } from '../components/button/button'
import { ProjectIcon } from '../components/projects/icon'
import React from 'react'

const  Home = () => ({
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

      <ProjectDescriptionModal
      descriptionModal={descriptionModal}
      setDescriptionModal={setDescriptionModal}
      modalKey={modalKey}
      setModalKey={setModalKey}
      projectData={projectData}
      handleRemove={handleRemove}
      />

      <AddButton
      isProjectVisible={isProjectVisible}
      setIsProjectVisible={setIsProjectVisible}
      handleRemove={handleRemove}
      />
      <ProjectIcon
      projectData={projectData}
      descriptionModal={descriptionModal}
      setModalKey={setModalKey}
      />  
    </div>
  )
}
export default Home