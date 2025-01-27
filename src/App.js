import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
////
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


import NavBar from './components/navbar/navbar'
import ProjectModal from './components/modal/modal'
import projectIcon from './components/projects/projectIcon'
import { AddButton } from './components/button/button'
////



const App = () => {
  const [projectData, setProjectData] = useState({
    name: '',
    goalSketches: ['Goal 1', 'Goal 2', 'Goal 3'],
    journeys: [],
    productView: 'Visão do produto',
    id: 123

  })

  const [isProjectVisible, setIsProjectVisible] = useState(true)
  
  return (
    <div className="App">
      <NavBar/>
      <ProjectModal 
      isVisible={isProjectVisible}
      setIsVisible={setIsProjectVisible}
      projectData={projectData}
      setProjectData={setProjectData}
      />

      <AddButton/>
    </div>
  );
}

export default App;
