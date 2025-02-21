import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useNavigate } from 'react-router'
import './NavBar.css'

const NavBar = ({ projectKey, userData }) => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const navigate = useNavigate()
  const [project, setProject] = useState({})

  useEffect(() => {
    if (userData?.projects) {
      const foundProject = userData.projects.find(proj => proj.key === projectKey);
      setProject(foundProject || {});
    } else {
      setProject({});
    }
  }, [projectKey, userData])



  return (
    <Navbar bg="purple" data-bs-theme="dark" expand={false}>
      <Container fluid>
        {/* Left Menu Toggle & Offcanvas */}
        <Navbar.Toggle 
          aria-controls="offcanvasNavbar-left" 
          onClick={() => setShowLeft(!showLeft)}
        />
        <Navbar.Brand ><Nav.Link onClick={() => navigate("/")}>Reactify</Nav.Link></Navbar.Brand>

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
              <Nav.Link  onClick={() => navigate("/admin/usuarios")}>Usuários</Nav.Link>
              <Nav.Link  onClick={() => navigate("/admin/config")}>Configurações</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <Nav className="flex-row" style={{justifyContent: 'space-between'}}>
          <Nav.Link onClick={() => navigate("/sign-up")}>Sign Up</Nav.Link>
          <Nav.Link onClick={() => navigate("/log-in")}>Log In</Nav.Link>
          <Nav.Link> Projeto: {project ?  project?.name : 'Sem projetos'}</Nav.Link>
          <Nav.Link> Key: {projectKey ?  projectKey : 'Sem Chave'}</Nav.Link>
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
                  <Nav.Link onClick={() => navigate(`${projectKey}/visao-geral`)}>Visão Geral</Nav.Link>
                  <Nav.Link onClick={() => navigate(`${projectKey}/goal-sketches`)}>Goal Sketch</Nav.Link>
                  <Nav.Link onClick={() => navigate(`${projectKey}/personas`)}>Personas</Nav.Link>
                  <Nav.Link onClick={() => navigate(`${projectKey}/user-stories`)}>User Stories</Nav.Link>
                  <Nav.Link onClick={() => navigate(`${projectKey}/journeys`)}>Journeys</Nav.Link>
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