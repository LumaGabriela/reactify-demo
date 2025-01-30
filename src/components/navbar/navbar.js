import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar ({modalKey, projectData}) {
  const project = projectData ? projectData.find(project => project.key === modalKey) : null

  return (
    <Navbar  bg="purple" data-bs-theme="dark" expand="lg" >
      <Container>
        <Navbar.Brand href="#home">Reactify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto " navbarScroll>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
            <Nav.Link href="#login">Log In</Nav.Link>
            <NavDropdown title={project ? project.name : "Teste"} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Visão Geral</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Goal Sketch
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Personas</NavDropdown.Item><NavDropdown.Item href="#action/3.4">Journeys</NavDropdown.Item>
            
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;