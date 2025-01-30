import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
////
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'


import NavBar from './components/navbar/navbar'
import {AddProjectModal, ProjectDescriptionModal} from './components/modal/modal'
import { AddButton } from './components/button/button'
import { ProjectIcon } from './components/projects/icon'
////



const App = () => {
  const [projectData, setProjectData] = useState([])


  const [isProjectVisible, setIsProjectVisible] = useState(false)
  const [descriptionModal, setDescriptionModal] = useState(false)
  const [modalKey, setModalKey] = useState('key ')

  const handleRemove = (type) => { 
    if (type === 'project') {
      return isProjectVisible ? setIsProjectVisible(false) : setIsProjectVisible(true)
    } else if (type === 'description') {
      return descriptionModal ? setDescriptionModal(false) : setDescriptionModal(true)
    }
  }
  return (
    <div className="App">
      <NavBar
      modalKey={modalKey}
      projectData={projectData}
      />
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
  );
}

export default App;
