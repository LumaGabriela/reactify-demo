import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
////
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


import NavBar from './components/navbar/navbar'
import ProjectModal from './components/modal/modal';

////



const App = () => {
  const [projectData, setProjectData] = useState({
    name: '',
    goalSketches: [],
    journeys: []
  })
  
  return (
    <div className="App">
      <NavBar/>
      <ProjectModal 
      projectData={projectData}
      setProjectData={setProjectData}
      />

    </div>
  );
}

export default App;
