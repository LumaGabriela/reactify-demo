import Botao from './components/button'
import * as React from 'react'
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css'

function Example() {
  return (
    <Alert dismissible variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>Change this and that and try again.</p>
    </Alert>
  );
}
function App() {
  return (
    <div className="App">
      <Botao/>
      <Example/>
    </div>
  );
}

export default App;
