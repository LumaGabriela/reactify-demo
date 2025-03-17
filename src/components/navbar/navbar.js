import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useNavigate } from 'react-router'
import './NavBar.css'

const NavBar = ({ projectKey, users, userKey }) => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [user, setUser] = useState(null)

  //Atualiza o usuario atual
  useEffect(() => {

  }, [users, userKey, projectKey])

  const navigate = useNavigate()
  //Fecha todos os menus laterais ao clicar em um link
  const handleNavigate = (path) => {
    setShowLeft(false)
    setShowRight(false)
    navigate(path)
  }
  const [project, setProject] = useState({})

  useEffect(() => {
    setUser(users.find(user => user.key === userKey))
    if (user?.projects) {
      const foundProject = user.projects.find(proj => proj.key === projectKey);
      setProject(foundProject || {})
    } else setProject({})
    
  }, [projectKey, user, userKey])



  return (
    <Navbar bg="purple" data-bs-theme="dark" expand={false}>
      <Container fluid>
        {/* Left Menu Toggle & Offcanvas */}
        <Navbar.Toggle 
          aria-controls="offcanvasNavbar-left" 
          onClick={() => setShowLeft(!showLeft)}
        />
        <Navbar.Brand ><Nav.Link onClick={() => handleNavigate("/")}>Reactify</Nav.Link></Navbar.Brand>

        <Navbar.Offcanvas
          show={showLeft}
          onHide={() => setShowLeft(false)}
          placement="start"
          id="offcanvasNavbar-left"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Configurações</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
            <hr className="nav-divider" />
              <Nav.Link  onClick={() => handleNavigate("/admin/usuarios")}>Usuários</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <Nav className="flex-row" style={{justifyContent: 'space-between'}}>
          <Nav.Link onClick={() => handleNavigate("/sign-up")}>Sign Up</Nav.Link>
          <Nav.Link onClick={() => handleNavigate("/log-in")}>Log In</Nav.Link>
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
                  <Nav.Link onClick={() => handleNavigate(`${projectKey}/visao-geral`)}>Visão Geral</Nav.Link>
                  <Nav.Link onClick={() => handleNavigate(`${projectKey}/product-canvas`)}>Product Canvas</Nav.Link>
                  <Nav.Link onClick={() => handleNavigate(`${projectKey}/personas`)}>Personas</Nav.Link>
                  <Nav.Link onClick={() => handleNavigate(`${projectKey}/goal-sketches`)}>Goal Sketch</Nav.Link>


                  {/* <Nav.Link onClick={() => handleNavigate(`${projectKey}/user-stories`)}>User Stories</Nav.Link> */}
                  <Nav.Link onClick={() => handleNavigate(`${projectKey}/journeys`)}>Journeys</Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default NavBar