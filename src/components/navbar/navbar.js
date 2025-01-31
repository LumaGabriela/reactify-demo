import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'

const NavBar = ({modalKey, projectData}) => {
  const project = projectData ? projectData.find(project => project.key === modalKey) : null

  return (
    <Navbar bg="purple" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Reactify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" navbarScroll>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
            <Nav.Link href="#login">Log In</Nav.Link>
            <NavDropdown title={project ? project.name : "Teste"} id="basic-nav-dropdown">
              <LinkContainer to="/visao-geral">
                <NavDropdown.Item>Visão Geral</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              {/* <LinkContainer to="/goal-sketch">
                <NavDropdown.Item>Goal Sketch</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/personas">
                <NavDropdown.Item>Personas</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/journeys">
                <NavDropdown.Item>Journeys</NavDropdown.Item>
              </LinkContainer> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;