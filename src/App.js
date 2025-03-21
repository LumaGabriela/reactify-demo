//// Importa as dependencias
import { BrowserRouter as Router, Routes, Route, Navigate, data } from 'react-router'

import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
//// Importa os estilos
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
//Importa componentes
import NavBar from './components/navbar/navbar'

// Importa as paginas 
import Home from './pages/Home'
import VisaoGeral from './pages/VisaoGeral'
import GoalSketch from './pages/GoalSketches.js'
import Personas from './pages/Personas'
import Journeys from './pages/Journeys'
import UserStories from './pages/UserStories'

import Usuarios from './pages/Usuarios'
import Usuario from './pages/Usuario'
import Cadastrar from './pages/Cadastrar'
import ProductCanvas from './pages/ProductCanvas.js'
//

const App = () => {

  // objeto que contem todos os usuarios do sistema
  const [users, setUsers] = useState([
    {
      name: 'Luma',
      key: 'user-key',
      projects: [
        {
          name: "Spotify Clone",
          visaoGeral: "Aplicação capaz de realizar streaming de músicas, com a possibilidade de criar playlists e compartilhar com amigos.",
          key: "project-key",
          productCanvas:{
            name: "Spotify Clone",  
            issues: [
              'Acesso difícil o u limitado a músicas em domínio público..', 'Valores excessivos praticados pelas plataformas de streaming'
            ],
            solutions: ['Criar uma plataforma.......'],
            personas: ['Logn - Administrador da plataforma', 'Thiago - Usuário'],
            restrictions: ['A plataforma deve bla bla bla..'],
            is: ['É uma plataforma web', 'É uma plataforma de streaming de música', 'Possui funcionalidades de criação de playlists', 'Possui funcionalidades de compartilhamento de playlists'],
            isNot: ['Não é um aplicativo móvel']

          },
          stories: [
            {
              id: "US01",
              title: "Como usuário, quero criar uma conta para acessar o aplicativo",
              type: "user"
            },
            {
              id: "US02",
              title: "Como usuário, quero criar e gerenciar playlists para organizar minhas músicas",
              type: "user"
            },
            {
              id: "SS01",
              title: "Como administrador, quero gerenciar usuários para manter o controle de acesso ao sistema",
              type: "system"
            },
            {
              id: "SS02",
              title: "Guaxinim fofo",
              type: "system"
            }
          ],
          goalSketches: [
            { type: 'BG', title: "Definir os requisitos do aplicativo", priority: 'HIGH', id: '123' },
            { type: 'CG', title: "Reunir requisitos funcionais e não funcionais", priority: 'MED', id: '321'  },
            { type:'BG', title: "Guaxinim", priority: 'LOW', id: '1233' }
          //bg: business goal, cg:constraint goal
          ],
          personas: [{
            name: "Thiago - Administrador do sistema",
            profile: [],
            expectations: [],
            restrictions: [],
            goals: []
            
          },
          {
            name: "João - Usuário do sistema",
            profile: ['', ''],
            expectations: [],
            restrictions: [],
            goals: ['', '']
          }
        ],
          journeys: [
            {
              name: "Usuário cria uma conta",
              steps: [
                { step: 0, description: "Usuário acessa a página de cadastro" },
                { step: 1, description: "Usuário clica no botão 'Sign Up'" },
                { step: 2, description: "Usuário é redirecionado para a página de cadastro" },
                { step: 3, description: "Usuário preenche o formulário de cadastro" },
                { step: 4, description: "Usuário insere nome, email e senha" },
                { step: 5, description: "Usuário clica no botão 'Cadastrar'" },
                { step: 6, description: "Usuário confirma o email" },
                { step: 7, description: "Usuário recebe um email de confirmação" },
                { step: 8, description: "Usuário clica no link de confirmação no email" },
                { step: 9, description: "Usuário faz login" },
                { step: 10, description: "Usuário insere email e senha na página de login" },
                { step: 11, description: "Usuário clica no botão 'Log In'" },
                { step: 12, description: "Usuário é redirecionado para a página inicial" }
              ]
            },
            {
              name: "Usuário cria uma playlist",
              steps: [
                { step: 0, description: "Usuário acessa a página de playlists" },
                { step: 1, description: "Usuário clica no menu 'Playlists'" },
                { step: 2, description: "Usuário é redirecionado para a página de playlists" },
                { step: 3, description: "Usuário cria uma nova playlist" },
                { step: 4, description: "Usuário clica no botão 'Nova Playlist'" },
                { step: 5, description: "Usuário insere o nome da playlist" },
                { step: 6, description: "Usuário clica no botão 'Criar'" },
                { step: 7, description: "Usuário adiciona músicas à playlist" },
                { step: 8, description: "Usuário pesquisa por músicas" },
                { step: 9, description: "Usuário clica no botão 'Adicionar' ao lado das músicas desejadas" },
                { step: 10, description: "Usuário compartilha a playlist" },
                { step: 11, description: "Usuário clica no botão 'Compartilhar'" },
                { step: 12, description: "Usuário escolhe a forma de compartilhamento (link, redes sociais, etc.)" },
                { step: 13, description: "Usuário envia a playlist para amigos" }
              ]
            }
          ]
        }
      ],
      role: 'customer',
      permissions: {
        write: false,
        read: true,
      }
    },
    {
      name: 'Raccoon',
      key: nanoid(),
      projects: [],
      role: 'admin',
      permissions: {
        write: true,
        read: true,
      }
    }
  ])

  // const [users, setUsers] = useState([])

  //Seletores de modais  ( define se está aberto ou fechado)
  const [modal, setModal] = useState({
    project: false,
    userStories: false,
    goalSketches: false,
    journeys: false,
    userRemove: false,
    userAdd: false
  })
  const [projectKey, setProjectKey] = useState('project-key')
  const [userKey, setUserKey] = useState('user-key')
  // //objeto contendo o banco de dados
  // const [backendData, setBackendData] = useState([{}])
  // //Carrega os usuarios do banco de dados
  // useEffect(() => {
  //   fetch('/api').then(
  //     response => response.json()
  //   ).then(
  //     data => setUsers(data)
  //   )
  // }, [])
  // //Atualiza os valores no backend
  // const updateBackend = async (updatedUsers) => {console.log('valor anterior:', updatedUsers);
  //   try {
  //     const response = await fetch('/api/update-users', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updatedUsers),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Erro ao atualizar o backend');
  //     }
  //     const data = await response.json();
  //     console.log('Backend atualizado com sucesso:', data);
  //   } catch (error) {
  //     console.error('Erro ao atualizar o backend:', error);
  //   }
  // };
  // useEffect(() => {
  //   console.log(users);
  //   updateBackend(users); // Chama a função para atualizar o backend
  // }, [users]);
  
  // Lógica de autenticação
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = true;
    return isAuthenticated ? children : <Navigate to="/" />
  }
  // Lida com a abertura de modal menus
  const handleRemove = (type) => {
    switch (type) {
      case 'project': return modal.project ? setModal({ ...modal, project: false }) : setModal({ ...modal, project: true })
      case 'journey': return modal.journeys ? setModal({ ...modal, journeys: false }) : setModal({ ...modal, journeys: true })
      case 'userStory': return modal.userStories ? setModal({ ...modal, userStories: false }) : setModal({ ...modal, userStories: true })
      case 'goalSketch': return modal.goalSketches ? setModal({ ...modal, goalSketches: false }) : setModal({ ...modal, goalSketches: true })
      case 'userRemove': return modal.userRemove ? setModal({ ...modal, userRemove: false }) : setModal({ ...modal, userRemove: true })
      default: console.log('Operação não encontrada: ' + type)
    }
  }
  useEffect(() => {
    console.log(users)
  }, [users])


  return (
    <>
      {(typeof users !== undefined) &&
        <Router basename='/reactify-demo'>
          <div className="App">
            <NavBar
              projectKey={projectKey}
              users={users}
              userKey={userKey}
            />
            <Routes>
              <Route path='/admin/usuarios'
                element={
                  <Usuarios
                    handleRemove={handleRemove}
                    users={users}
                  />}
              />
              <Route path='/admin/usuarios/cadastrar'
                element={
                  <Cadastrar
                    users={users}
                    setUsers={setUsers}
                  />}
              />
              <Route path='/admin/usuarios/:userId'
                element={
                  <PrivateRoute>
                    <Usuario
                      users={users}
                      setUsers={setUsers}
                      handleRemove={handleRemove}
                      modal={modal}
                      userKey={userKey}
                      setUserKey={setUserKey}
                    />
                  </PrivateRoute>
                } />
              <Route path='/' element={
                <Home
                  modal={modal}
                  setModal={setModal}
                  handleRemove={handleRemove}
                  userKey={userKey}
                  users={users}
                  setUsers={setUsers}
                  projectKey={projectKey}
                  setProjectKey={setProjectKey}
                />
              } />
              <Route path='/:projectId/visao-geral/' element={
                <PrivateRoute>
                  <VisaoGeral
                    users={users}
                    setUsers={setUsers}
                    userKey={userKey}
                  />
                </PrivateRoute>
              } />

              <Route path="/:projectId/product-canvas" element={
                <ProductCanvas
                  projectKey={projectKey}
                  userKey={userKey}
                  users={users}
                  setUsers={setUsers}
                />
              } />
              <Route path="/:projectId/user-stories" element={
                <UserStories
                  projectKey={projectKey}
                  handleRemove={handleRemove}
                  modal={modal}
                  userKey={userKey}
                  users={users}
                  setUsers={setUsers}
                />
              } />

              <Route path="/:projectId/goal-sketches" element={
                <GoalSketch
                  projectKey={projectKey}
                  handleRemove={handleRemove}
                  modal={modal}
                  userKey={userKey}
                  users={users}
                  setUsers={setUsers}
                />
              } />

              <Route path="/:projectId/personas" element={
                <Personas
                  projectKey={projectKey}
                  userKey={userKey}
                  users={users}
                  setUsers={setUsers}
                />
              } />

              <Route path="/:projectId/journeys" element={
                <Journeys
                  modal={modal}
                  projectKey={projectKey}
                  handleRemove={handleRemove}
                  userKey={userKey}
                  users={users}
                  setUsers={setUsers}
                />
              } />
            </Routes>


          </div>
        </Router>

      }  
      </>
  )

}

export default App
