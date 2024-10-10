const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
    });


// 1. Lista de perguntas
const perguntas = [
    "Você sabia que Ludovico Pavoni fundou sua própria congregação, conhecida como os Filhos de Maria Imaculada, em 1825?",
    "Você sabia que Ludovico Pavoni foi condecorado com o título de Cavaleiro da Coroa de Ferro pelo Imperador da Áustria, Ferdinando I, em 1844?",
    "Você sabia que Ludovico Pavoni criou uma editora em 1823, chamada 'A Editora de São Barnabé', que foi a precursora da atual editora Ancora?",
    "Você sabia que Ludovico Pavoni ajudou a cuidar das vítimas de uma epidemia de cólera em 1836 e novamente durante o conflito dos Dez Dias em 1849?",
    "Você sabia que Ludovico Pavoni foi ordenado sacerdote em 1807 e nomeado reitor da Igreja de São Barnabé em 1818?"
  ];
  // Ao invés de obter as respostas da API, use um array estático para teste

  
  // 2. Função para fazer requisição ao Forge e obter as respostas
  async function obterRespostasDoForge() {
    try {
      const response = await fetch('https://forge.withub.ai/api/triggers/5257a02d-c19b-4969-ab81-2206de86082c/execute/66f80f3c5a82beed1d1bd70d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Enviamos o corpo vazio como especificado
      });
  
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
  
      const data = await response.json(); // Supondo que a API devolva um JSON com as respostas
      return data;
    } catch (error) {
      console.error('Erro ao obter respostas do Forge:', error);
    }
  }
  
  // 3. Variáveis de controle
  let perguntaAtual = 0;
  let respostasForge = [];
  
  // 4. Função para exibir uma pergunta
  function exibirPergunta(pergunta) {
    const perguntaDiv = document.getElementById('pergunta');
    const respostaDiv = document.getElementById('resposta');
    const botaoProxima = document.getElementById('proximaPergunta');
  
    // Limpar a pergunta e a resposta anteriores
    perguntaDiv.innerHTML = `<p>${pergunta}</p>`;
    respostaDiv.innerHTML = "";
    botaoProxima.style.display = "none"; // Esconder botão de próxima até que a resposta apareça
  
    // Exibir a resposta correspondente
    respostaDiv.innerHTML = `<p><strong>Resposta:</strong> ${respostasForge[perguntaAtual]}</p>`;
    
    // Mostrar o botão de próxima pergunta
    botaoProxima.style.display = "block";
  }
  
  // 5. Função para iniciar o processo
  document.addEventListener('DOMContentLoaded', async () => {
    respostasForge = await obterRespostasDoForge(); // Obtemos as respostas do Forge
    
    // Exibir a primeira pergunta
    exibirPergunta(perguntas[perguntaAtual]);
  
    // 6. Função para exibir a próxima pergunta quando o botão for clicado
    document.getElementById('proximaPergunta').addEventListener('click', () => {
      perguntaAtual++;
      if (perguntaAtual < perguntas.length) {
        exibirPergunta(perguntas[perguntaAtual]);
      } else {
        alert("Você respondeu todas as perguntas!");
      }
    });
  });
  