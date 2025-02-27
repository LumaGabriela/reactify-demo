//// Importa as dependencias
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'

import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
//// Importa os estilos
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
//Importa componentes
import NavBar from './components/navbar/NavBar'

// Importa as paginas 
import Home from './pages/Home'
import VisaoGeral from './pages/VisaoGeral'
import GoalSketch from './pages/GoalSketch'
import Personas from './pages/Personas'
import Journeys from './pages/Journeys'
import UserStories from './pages/UserStories'
import Config from './pages/Config'
import Usuarios from './pages/Usuarios'
import Usuario from './pages/Usuario'
import Cadastrar from './pages/Cadastrar'
//

const App = () => {
  //
  const [users, setUsers] = useState([
    {
      name: 'Luma',
      key: 'user-key',
      projects: [
        {
          name: "Aplicativo de streaming de música",
          visaoGeral: "Aplicação capaz de realizar streaming de músicas, com a possibilidade de criar playlists e compartilhar com amigos.",
          key: "project-key",
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
          goalSketch: [
            { step: 0, description: "Definir os requisitos do aplicativo" },
            { step: 1, description: "Reunir requisitos funcionais e não funcionais" },
            { step: 2, description: "Identificar as partes interessadas" },
            { step: 3, description: "Criar um documento de especificação de requisitos" },
            { step: 4, description: "Desenhar a interface do usuário" },
            { step: 5, description: "Criar wireframes para as principais telas" },
            { step: 6, description: "Desenvolver protótipos de alta fidelidade" },
            { step: 7, description: "Realizar testes de usabilidade" },
            { step: 8, description: "Implementar a funcionalidade de streaming" },
            { step: 9, description: "Configurar o servidor de streaming" },
            { step: 10, description: "Desenvolver o player de música" },
            { step: 11, description: "Integrar o player com o servidor de streaming" },
            { step: 12, description: "Adicionar funcionalidades de playlist" },
            { step: 13, description: "Permitir a criação de playlists" },
            { step: 14, description: "Implementar a funcionalidade de adicionar/remover músicas" },
            { step: 15, description: "Desenvolver a funcionalidade de compartilhamento de playlists" },
            { step: 16, description: "Testar e lançar o aplicativo" },
            { step: 17, description: "Realizar testes de integração" },
            { step: 18, description: "Corrigir bugs encontrados" },
            { step: 19, description: "Lançar a versão beta para um grupo seleto de usuários" },
            { step: 20, description: "Lançar a versão final para o público" }
          ],
          persona: [],
          journey: [
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
      role: 'user',
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
  const [userData, setUserData] = useState({})// Usuario da sessao
  //Seletores de modais  ( define se está aberto ou fechado)
  const [modal, setModal] = useState({
    project: false, 
    userStories:false,
    journeys: false,
    userRemove: false,
    userAdd: false
  })
  const [projectKey, setProjectKey] = useState('project-key')
  const [userKey, setUserKey] = useState('user-key')
  // Lógica de autenticação
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = true;
    return isAuthenticated ? children : <Navigate to="/" />
  }
  // Lida com a abertura de modal menus
  const handleRemove = (type) => {
    switch (type) {
      case 'project': return modal.project ? setModal({ ...modal, project: false }) : setModal({ ...modal, project: true })
      case 'journey': return modal.journeys ? setModal({ ...modal, journeys: false }) : setModal({ ...modal, journeys: false })
      case 'userStory': return modal.userStories ? setModal({ ...modal, userStories: false }) : setModal({ ...modal, userStories: true })
      case 'userRemove': return modal.userRemove ? setModal({ ...modal, userRemove: false }) : setModal({ ...modal, userRemove: true })    
      default: console.log('Operação não encontrada: ' + type)
    }
  }
  // Sempre que se atualizar a userKey, se atualiza o userData
  useEffect(() => {
    setUserData(users.find(user => user.key === userKey));
  }, [userKey, users])

  return (
    <Router basename='/reactify-demo'>
      <div className="App">
        <NavBar
          projectKey={projectKey}
          userData={userData}
        />
        <Routes>
          <Route path='/config'
            element={
              <Config />
            }
          />
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
                  user={userData}
                  setUser={setUserData}
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

              userData={userData}
              setUserData={setUserData}
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
                projectKey={projectKey}
                userData={userData} />
            </PrivateRoute>
          } />

          <Route path="/:projectId/user-stories" element={
            <UserStories
              userData={userData}
              projectKey={projectKey}
              handleRemove={handleRemove}
              setUserData={setUserData}
              modal={modal}
              userKey={userKey}
              users={users}
              setUsers={setUsers}
            />
          } />

          <Route path="/:projectId/goal-sketches" element={
            <GoalSketch
              userKey={userKey}
              users={users}
              setUsers={setUsers} />
          } />

          <Route path="/:projectId/personas" element={
            <Personas
              userKey={userKey}
              users={users}
              setUsers={setUsers}
            />
          }/>

          <Route path="/:projectId/journeys" element={
            <Journeys
              modal={modal}
              projectKey={projectKey}
              handleRemove={handleRemove}
              setUserData={setUserData}
              userData={userData}
              userKey={userKey}
              users={users}
              setUsers={setUsers}
            />
          } />
        </Routes>


      </div>
    </Router>
  )
}

export default App
