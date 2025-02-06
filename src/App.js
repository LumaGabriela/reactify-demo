import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router'
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
import UserStories from './pages/UserStories'

const App = () => {
  const [projectData, setProjectData] = useState([
    {
      name: "Aplicativo de streaming de música",
      visaoGeral: "Aplicação capaz de realizar streaming de músicas, com a possibilidade de criar playlists e compartilhar com amigos.",
      key: "key",
      userStory: [],
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
  ])


  const [isProjectVisible, setIsProjectVisible] = useState(false)
  const [descriptionModal, setDescriptionModal] = useState(false)
  const [journeyModal, setJourneyModal] = useState(false)
  const [storyModal, setStoryModal] = useState(false)
  const [modalKey, setModalKey] = useState('key')



  const handleRemove = (type) => {
    if (type === 'project') {
      return isProjectVisible ? setIsProjectVisible(false) : setIsProjectVisible(true)

    } else if (type === 'journey') {
      return journeyModal ? setJourneyModal(false) : setJourneyModal(true)

    } else if (type === 'userStory') {
      console.log(storyModal)
      return storyModal ? setStoryModal(false) : setStoryModal(true)

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
            <VisaoGeral 
            modalKey={modalKey}
            projectData={projectData}/>
          } />

          <Route path="/user-stories" element={
            <UserStories 
              projectData={projectData}
              handleRemove={handleRemove}
              setProjectData={setProjectData}
              storyModal={storyModal}
            />
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
