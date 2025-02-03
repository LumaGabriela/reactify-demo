import { BrowserRouter as Router, Routes, Route } from 'react-router'
import React, { useState } from 'react'
////
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'


import NavBar from './components/navbar/NavBar'

////
import Home from './pages/Home';
import VisaoGeral from './pages/VisaoGeral'
import GoalSketch from './pages/GoalSketch'
import Personas from './pages/Personas'
import Journeys from './pages/Journeys'


const App = () => {
  const [projectData, setProjectData] = useState([
    {
      name: "Aplicativo de streaming de música",
      visaoGeral: "Aplicação capaz de realizar streaming de músicas, com a possibilidade de criar playlists e compartilhar com amigos.",
      key: "key",
      goalSketch: [
        {
          step: 1,
          description: "Definir os requisitos do aplicativo",
          tasks: [
            "Reunir requisitos funcionais e não funcionais",
            "Identificar as partes interessadas",
            "Criar um documento de especificação de requisitos"
          ]
        },
        {
          step: 2,
          description: "Desenhar a interface do usuário",
          tasks: [
            "Criar wireframes para as principais telas",
            "Desenvolver protótipos de alta fidelidade",
            "Realizar testes de usabilidade"
          ]
        },
        {
          step: 3,
          description: "Implementar a funcionalidade de streaming",
          tasks: [
            "Configurar o servidor de streaming",
            "Desenvolver o player de música",
            "Integrar o player com o servidor de streaming"
          ]
        },
        {
          step: 4,
          description: "Adicionar funcionalidades de playlist",
          tasks: [
            "Permitir a criação de playlists",
            "Implementar a funcionalidade de adicionar/remover músicas",
            "Desenvolver a funcionalidade de compartilhamento de playlists"
          ]
        },
        {
          step: 5,
          description: "Testar e lançar o aplicativo",
          tasks: [
            "Realizar testes de integração",
            "Corrigir bugs encontrados",
            "Lançar a versão beta para um grupo seleto de usuários",
            "Lançar a versão final para o público"
          ]
        }
      ],
      personas: [],
      journeys: [
        {
          name: "Usuário cria uma conta",
          steps: [
            {
              step: 1,
              description: "Usuário acessa a página de cadastro",
              tasks: [
                "Usuário clica no botão 'Sign Up'",
                "Usuário é redirecionado para a página de cadastro"
              ]
            },
            {
              step: 2,
              description: "Usuário preenche o formulário de cadastro",
              tasks: [
                "Usuário insere nome, email e senha",
                "Usuário clica no botão 'Cadastrar'"
              ]
            },
            {
              step: 3,
              description: "Usuário confirma o email",
              tasks: [
                "Usuário recebe um email de confirmação",
                "Usuário clica no link de confirmação no email"
              ]
            },
            {
              step: 4,
              description: "Usuário faz login",
              tasks: [
                "Usuário insere email e senha na página de login",
                "Usuário clica no botão 'Log In'",
                "Usuário é redirecionado para a página inicial"
              ]
            }
          ]
        },
        {
          name: "Usuário cria uma playlist",
          steps: [
            {
              step: 1,
              description: "Usuário acessa a página de playlists",
              tasks: [
                "Usuário clica no menu 'Playlists'",
                "Usuário é redirecionado para a página de playlists"
              ]
            },
            {
              step: 2,
              description: "Usuário cria uma nova playlist",
              tasks: [
                "Usuário clica no botão 'Nova Playlist'",
                "Usuário insere o nome da playlist",
                "Usuário clica no botão 'Criar'"
              ]
            },
            {
              step: 3,
              description: "Usuário adiciona músicas à playlist",
              tasks: [
                "Usuário pesquisa por músicas",
                "Usuário clica no botão 'Adicionar' ao lado das músicas desejadas"
              ]
            },
            {
              step: 4,
              description: "Usuário compartilha a playlist",
              tasks: [
                "Usuário clica no botão 'Compartilhar'",
                "Usuário escolhe a forma de compartilhamento (link, redes sociais, etc.)",
                "Usuário envia a playlist para amigos"
              ]
            }
          ]
        }
      ]
    }
  ])


  const [isProjectVisible, setIsProjectVisible] = useState(false)
  const [descriptionModal, setDescriptionModal] = useState(false)
  const [journeyModal, setJourneyModal] = useState(false)
  const [modalKey, setModalKey] = useState('key')



  const handleRemove = (type) => {
    if (type === 'project') {
      return isProjectVisible ? setIsProjectVisible(false) : setIsProjectVisible(true)

    } else if (type === 'description') {
      return descriptionModal ? setDescriptionModal(false) : setDescriptionModal(true)

    } else if (type === 'journey') {
      console.log(projectData)
      return journeyModal ? setJourneyModal(false) : setJourneyModal(true)

    }
  }
  return (
    <Router>
      <div className="App">

        <NavBar
          modalKey={modalKey}
          projectData={projectData}
        />
        <Routes>
          <Route path='/' element={
            <Home
              isProjectVisible={isProjectVisible}
              setIsProjectVisible={setIsProjectVisible}
              projectData={projectData}
              setProjectData={setProjectData}
              handleRemove={handleRemove}
              descriptionModal={descriptionModal}
              setDescriptionModal={setDescriptionModal}
              modalKey={modalKey}
              setModalKey={setModalKey}
            />
          } />
          <Route path='/visao-geral' element={
            <VisaoGeral />
          } />
          <Route path="/goal-sketch" element={
            <GoalSketch />
          } />
          <Route path="/personas" element={
            <Personas />
          } />
          <Route path="/journeys" element={
            <Journeys
            modalKey={modalKey}
              journeyModal={journeyModal}
              setJourneyModal={setJourneyModal}
              handleRemove={handleRemove}
              setProjectData={setProjectData}
              projectData={projectData} />
          } />
        </Routes>


      </div>
    </Router>
  );
}

export default App;
