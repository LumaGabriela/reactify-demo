import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react'
import NavBar from './components/navbar/navbar'
import './App.css'
import ModalMenu from './components/modal/modal';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <ModalMenu/>

    </div>
  );
}

export default App;
