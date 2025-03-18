//Execute o comando: node example.mjs
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

async function gerarStories(entrevista) {
  const prompt = `
  Com base na seguinte entrevista, gere user stories e system stories no formato:
  
  - User Story: Como [persona], eu quero [ação] para que [benefício]. 
  - System Story: O sistema deve [ação]. 
  
  Retorne as stories no seguinte formato: 
  {
    id: "US01",
    title: "Como usuário, quero criar uma conta para acessar o aplicativo",
    type: "user"
  }, ...
  {
    id: "SS01",
    title: "Como administrador, quero gerenciar usuários para manter o controle de acesso ao sistema",
    type: "system"
  }, ...
  
  Entrevista: ${entrevista}
  `;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: "Você é um assistente que gera user stories e system stories" },
      { role: 'user', content: prompt },
    ],
    temperature: 0.0,
  });

  //Extrair as stories do retorno da API
  return response.choices[0].message.content;
}
  
gerarStories(
  `
  Certo, vamos direto ao ponto. A ideia é desenvolver uma plataforma de streaming de música semelhante ao Spotify. O que já temos definido até agora? A proposta é um serviço que permita aos usuários ouvir músicas sob demanda, criar playlists, seguir artistas e receber recomendações personalizadas. Também precisamos definir um modelo de monetização e pensar em diferenciais para competir no mercado.  

  Esse produto será multiplataforma? Sim. A princípio, precisamos de aplicativos para iOS e Android, além de uma versão web. Se for necessário, podemos expandir para smart TVs e outros dispositivos no futuro. E quais funcionalidades são essenciais desde o início? Precisamos garantir streaming de áudio sob demanda, criação e compartilhamento de playlists, um sistema de recomendações eficiente, busca avançada e modo offline para assinantes premium.  

  Como funcionará a busca? O usuário deve poder pesquisar pelo nome da música, artista, álbum e gênero. Se possível, também podemos incluir filtros por humor ou atividade. O catálogo será fechado ou os usuários poderão enviar músicas próprias? No primeiro momento, apenas consumo do catálogo oficial. Mas podemos planejar uma feature futura para permitir que artistas independentes façam uploads.  

  Sobre o design, temos alguma referência específica? Queremos algo fluido, intuitivo e moderno. O usuário não deve ter dificuldade para navegar. Podemos seguir a linha do Spotify e Apple Music, mas tentar trazer um diferencial visual. Também seria interessante oferecer um modo escuro.  

  Falando da qualidade do áudio, precisamos definir diferentes níveis para otimizar o consumo de dados? Sim, no mínimo três: baixa, média e alta qualidade. No plano premium, podemos oferecer áudio lossless. O streaming precisará de um buffer dinâmico para ajustar a qualidade conforme a conexão do usuário? Sim, isso é essencial para evitar interrupções.  

  Em relação à monetização, como será o modelo de negócios? Seguimos o padrão: uma versão gratuita com anúncios e um plano premium sem anúncios e com funcionalidades extras. Além da remoção de anúncios, o que mais o premium pode oferecer? Modo offline, melhor qualidade de áudio, possibilidade de pular músicas ilimitadamente e integração com dispositivos como smart speakers.  

  Vamos incluir funcionalidades sociais? Sim. O usuário deve poder compartilhar playlists, seguir amigos e talvez ver o que eles estão ouvindo em tempo real. Também seria interessante permitir login via Google, Facebook e Apple ID. Sobre privacidade, os usuários terão controle sobre o que compartilham? Sim, playlists privadas devem ficar privadas, e o usuário precisa ter a opção de definir o que fica visível para amigos.  

  Vamos coletar dados de comportamento para melhorar recomendações? Sim, mas de forma transparente. O usuário deve estar ciente disso e poder gerenciar suas preferências. Certo, já temos um escopo inicial bem definido. O próximo passo é documentar esses requisitos e definir um MVP, priorizando as funcionalidades para a primeira versão. Perfeito. Vou estruturar isso e voltamos a revisar antes de seguir com o desenvolvimento.
  `
  ).then((stories) => {
    console.log(stories);
  }).catch((error) => {
    console.error("Erro ao gerar stories:", error);
  });