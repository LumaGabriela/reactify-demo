import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useNavigate } from 'react-router';

const NavBar = ({modalKey, projectData}) => {

  const navigate = useNavigate() 
  const project = projectData ? projectData.find(project => project.key === modalKey) : null

   useEffect(() => {}, [modalKey])


  return (
    <Navbar bg="purple" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Reactify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" navbarScroll>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
            <Nav.Link href="#login">Log In</Nav.Link>

            {project && <NavDropdown title={project ? project.name : "Projeto Teste"} id="basic-nav-dropdown">

              <NavDropdown.Item onClick={ () => navigate("/visao-geral")}> Visão Geral</NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item onClick={() => navigate("/goal-sketch")}>Goal Sketch</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/personas")}>Personas</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/journeys")}>Journeys</NavDropdown.Item>

            </NavDropdown>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar