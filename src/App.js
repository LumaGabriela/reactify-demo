import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
////
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'


import NavBar from './components/navbar/navbar'
import ProjectModal from './components/modal/modal'
import { AddButton } from './components/button/button'
import ProjectIcon from './components/projects/projectIcon'
////



const App = () => {
  const [projectData, setProjectData] = useState([])


  const [isProjectVisible, setIsProjectVisible] = useState(false)
  const handleRemove = () => { console.log (isProjectVisible)
    isProjectVisible ? setIsProjectVisible(false) : setIsProjectVisible(true)
  }
  return (
    <div className="App">
      <NavBar/>
      <ProjectModal 
      isProjectVisible={isProjectVisible}
      setIsProjectVisible={setIsProjectVisible}
      projectData={projectData}
      setProjectData={setProjectData}
      handleRemove={handleRemove}
      />

      <AddButton
      isProjectVisible={isProjectVisible}
      setIsProjectVisible={setIsProjectVisible}
      handleRemove={handleRemove}
      />
      <ProjectIcon
      projectData={projectData}
      />
    </div>
  );
}

export default App;
