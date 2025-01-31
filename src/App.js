import { BrowserRouter as Router, Routes, Route } from 'react-router'
import React, { useState } from 'react'
////
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'


import NavBar from './components/navbar/navbar'

////
import Home from './pages/Home';
import VisaoGeral from './pages/VisaoGeral'
import GoalSketch from './pages/GoalSketch'
import Personas from './pages/Personas'
import Journeys from './pages/Journeys'


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
  <Router>
    <div className="App">
      
        <NavBar
        modalKey={modalKey}
        projectData={projectData}
        />
        <Routes>
          <Route path='/' element={
            <Home
            isProjectVisible={isProjectVisible}
            setIsProjectVisible={setIsProjectVisible}
              projectData={projectData}
              setProjectData={setProjectData}
              handleRemove={handleRemove}
              descriptionModal={descriptionModal}
              setDescriptionModal={setDescriptionModal}
              modalKey={modalKey}
              setModalKey={setModalKey}
          />
            }/>
          <Route path='/visao-geral' element={<VisaoGeral/>}/>
          <Route path="/goal-sketch" element={<GoalSketch />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="/journeys" element={<Journeys />} />
        </Routes>      
      
     
    </div>
  </Router>
  );
}

export default App;
