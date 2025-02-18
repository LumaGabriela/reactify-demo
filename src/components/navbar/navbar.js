import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useNavigate } from 'react-router'
import './NavBar.css'

const NavBar = ({ modalKey, projectData }) => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const navigate = useNavigate();
  const project = projectData ? projectData.find(project => project.key === modalKey) : null;

  return (
    <Navbar bg="purple" data-bs-theme="dark" expand={false}>
      <Container fluid>
        {/* Left Menu Toggle & Offcanvas */}
        <Navbar.Toggle 
          aria-controls="offcanvasNavbar-left" 
          onClick={() => setShowLeft(!showLeft)}
        />
        <Navbar.Brand href="/">Reactify</Navbar.Brand>

        <Navbar.Offcanvas
          show={showLeft}
          onHide={() => setShowLeft(false)}
          placement="start"
          id="offcanvasNavbar-left"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Admin Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
            <hr className="nav-divider" />
              <Nav.Link  onClick={() => navigate("/usuarios")}>Usuários</Nav.Link>
              <Nav.Link  onClick={() => navigate("/config")}>Configurações</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <Nav className="flex-row" style={{justifyContent: 'space-between'}}>
          <Nav.Link style={{margin: '0 0.5rem'}} onClick={() => navigate("/sign-up")}>Sign Up</Nav.Link>
          <Nav.Link onClick={() => navigate("/log-in")}>Log In</Nav.Link>
        </Nav>
        {/* Right Menu Toggle & Offcanvas */}
        <Navbar.Toggle 
          aria-controls="offcanvasNavbar-right" 
          onClick={() => setShowRight(!showRight)}
        />
        
        <Navbar.Offcanvas
          show={showRight}
          onHide={() => setShowRight(false)}
          placement="end"
          id="offcanvasNavbar-right"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Project Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <hr className="nav-divider" />
              {project && (
                <>
                  <Nav.Link onClick={() => navigate("/visao-geral")}>Visão Geral</Nav.Link>
                  <Nav.Link onClick={() => navigate("/goal-sketch")}>Goal Sketch</Nav.Link>
                  <Nav.Link onClick={() => navigate("/personas")}>Personas</Nav.Link>
                  <Nav.Link onClick={() => navigate("/user-stories")}>User Stories</Nav.Link>
                  <Nav.Link onClick={() => navigate("/journeys")}>Journeys</Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;