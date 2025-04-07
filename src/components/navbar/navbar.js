import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useNavigate } from 'react-router'
import './NavBar.css'
import { Badge } from 'react-bootstrap'
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import GroupsIcon from '@mui/icons-material/Groups';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import MenuIcon from '@mui/icons-material/Menu';

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
    <Navbar className="custom-navbar-bg" bg="blue" data-bs-theme="dark" expand={false}>
      <Container fluid>
        {/* Left Menu Toggle & Offcanvas */}
        {/* <Navbar.Toggle 
          aria-controls="offcanvasNavbar-left" 
          onClick={() => setShowLeft(!showLeft)}
        /> */}
        <MenuIcon
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
          <Offcanvas.Header 
          // closeButton
          >
            <Offcanvas.Title>Configurações</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
            <hr className="nav-divider" />
              <Nav.Link onClick={() => handleNavigate("/admin/usuarios")}>
                <GroupIcon/>
                <>Usuários</>
                <Badge bg="" className="custom-badge-bg" >{users.length.toString()}</Badge>
              </Nav.Link>

              {/* Seção Projetos */}
              <Offcanvas.Title className='mt-5'>Configurações</Offcanvas.Title>
              <hr className="nav-divider" />
              <div className="ps-3 mb-2 text-muted small">PROJETOS</div>
              
              {user?.projects?.map((project) => (
                <Nav.Link 
                  key={project.key}
                  onClick={() => {
                    // setProjectKey(project.key); // Agora definido corretamente
                    handleNavigate(`/${project.key}/visao-geral`);
                  }}
                  className="d-flex align-items-center gap-2 ps-4"
                >
                  {/* <FolderIcon fontSize="small"/> */}
                  <span>{project.name}</span>
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <Nav className="flex-row" style={{justifyContent: 'space-between'}}>
          <Nav.Link onClick={() => handleNavigate("/sign-up")}>Sign Up</Nav.Link>
          <Nav.Link onClick={() => handleNavigate("/log-in")}>Log In</Nav.Link>
        </Nav>
        {/* Right Menu Toggle & Offcanvas */}
        {/* <Navbar.Toggle 
          aria-controls="offcanvasNavbar-right" 
          onClick={() => setShowRight(!showRight)}
        /> */}
        <MenuIcon
          aria-controls="offcanvasNavbar-right" 
          onClick={() => setShowRight(!showRight)}
        />
        
        <Navbar.Offcanvas
          show={showRight}
          onHide={() => setShowRight(false)}
          placement="end"
          id="offcanvasNavbar-right"
        >
           <Offcanvas.Header 
          // closeButton
          >
            <Offcanvas.Title>Project Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <hr className="nav-divider" />
              {project && (
                <>
                  <Nav.Link onClick={() => handleNavigate(`${projectKey}/visao-geral`)}><LeaderboardIcon/>Visão Geral</Nav.Link>
                  <Nav.Link onClick={() => handleNavigate(`${projectKey}/product-canvas`)}><DashboardIcon/>Product Canvas</Nav.Link>
                  <Nav.Link onClick={() => handleNavigate(`${projectKey}/personas`)}><GroupsIcon/>Personas</Nav.Link>
                  <Nav.Link onClick={() => handleNavigate(`${projectKey}/goal-sketches`)}><TrackChangesIcon/>Goal Sketch</Nav.Link>
                  <Nav.Link onClick={() => handleNavigate(`${projectKey}/stories`)}><WebStoriesIcon/>Estórias</Nav.Link>
                  <Nav.Link onClick={() => handleNavigate(`${projectKey}/journeys`)}><TimelineIcon/>Journeys</Nav.Link>
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