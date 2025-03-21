const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require("dotenv").config();
const openai = require("openai");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize OpenAI client
const client = new openai.OpenAI(process.env.OPENAI_API_KEY);

// Middleware para analisar o corpo das requisições
//app.use(bodyParser.json());
app.use(express.json());

// app.use(cors(corsOptions));
app.use(cors());

// Dados dos usuários (simulação de banco de dados)
let users = [
  {
    name: 'Luma',
    key: 'user-key',
    projects: [
      {
        name: "Spotify Clone",
        visaoGeral: "Aplicação capaz de realizar streaming de músicas, com a possibilidade de criar playlists e compartilhar com amigos.",
        key: "project-key",
        productCanvas: {
          name: "Spotify Clone",
          issues: [
            'Acesso difícil ou limitado a músicas em domínio público.',
            'Valores excessivos praticados pelas plataformas de streaming'
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
        goalSketch: [
          { type: 'BG', title: "Definir os requisitos do aplicativo", priority: 'HIGH', id: '123' },
          { type: 'CG', title: "Reunir requisitos funcionais e não funcionais", priority: 'MED', id: '321' },
          { type: 'BG', title: "Guaxinim", priority: 'LOW', id: '1233' }
        ],
        personas: [
          {
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
    role: 'customer',
    permissions: {
      write: false,
      read: true,
    }
  },
  {
    name: 'Raccoon',
    key: 'keykeyteste',
    projects: [],
    role: 'admin',
    permissions: {
      write: true,
      read: true,
    }
  }
];

// Rota para obter os usuários
app.get('/api', (req, res) => {
  res.json(users);
});

async function generateStories(interview) {
  const prompt = `
  Com base na seguinte entrevista, gere user stories e system stories no formato:

  - User Story: "Como [persona], eu quero [ação] para que [benefício]."
  - System Story: "O sistema deve [ação]."

  Retorne as stories no seguinte formato:
  ### User Stories ###
  Como [persona], eu quero [ação] para que [benefício].
  Como [persona], eu quero [ação] para que [benefício].

  ### System Stories ###
  O sistema deve [ação].
  O sistema deve [ação].

  Entrevista:
  ${interview}
  `;

  try {
      const response = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
              { role: 'system', content: "Você é um assistente que gera user stories e system stories" },
              { role: 'user', content: prompt },
          ],
          temperature: 0.0,
      });

      if (!response || !response.choices || !response.choices[0].message) {
          throw new Error("Resposta inesperada da API.");
      }

      const storiesText = response.choices[0].message.content.trim();

      const userStories = [];
      const systemStories = [];
      let currentSection = null;

      storiesText.split("\n").forEach(line => {
          line = line.trim();
          if (line.startsWith("### User Stories ###")) {
              currentSection = "user";
          } else if (line.startsWith("### System Stories ###")) {
              currentSection = "system";
          } else if (line && currentSection === "user") {
              userStories.push(line);
          } else if (line && currentSection === "system") {
              systemStories.push(line);
          }
      });

      const formattedStories = [];

      userStories.forEach((story, i) => {
          formattedStories.push({
              id: `US${i + 1}`,
              type: "user",
              title: story//.split(",")[0].replace("Como ", ""),
              //description: story,
              //persona: story.split(" ")[1]
          });
      });

      systemStories.forEach((story, i) => {
          formattedStories.push({
              id: `SS${i + 1}`,
              type: "system",
              title: story//.replace("O sistema deve ", ""),
              //description: story
          });
      });

      return formattedStories;
  } catch (error) {
      console.error("Erro ao gerar histórias:", error);
      throw error;
  }
}

app.post("/generate-stories", async (req, res) => {
  try {
      const { interview } = req.body;
      if (!interview) {
          return res.status(400).json({ error: "Entrevista é obrigatória." });
      }
      const stories = await generateStories(interview);
      res.json({ stories });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar os usuários
app.post('/api/update-users', (req, res) => {
  const updatedUsers = req.body;
  users = updatedUsers;
  res.json(users);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});