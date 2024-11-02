// Timeline Reveal Functionality
function revealElements() {
  const events = document.querySelectorAll('.timeline-event');
  const timeline = document.querySelector('.timeline');
  const windowHeight = window.innerHeight;
  let timelineActivated = false;

  events.forEach(event => {
      const eventTop = event.getBoundingClientRect().top;

      if (eventTop < windowHeight - 100) {
          event.classList.add('visible');
          timelineActivated = true;
      } else {
          event.classList.remove('visible');
      }
  });

  // Activate the central line animation when at least one event is visible
  if (timelineActivated) {
      timeline.classList.add('active');
  } else {
      timeline.classList.remove('active');
  }
}

window.addEventListener('scroll', revealElements);


// Confetti Animation
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.confetti-container');

  function createConfetti() {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');

      // Randomly select a color
      const colors = ['#ff0a1d', '#1dff0a', '#0a1dff', '#ffea00', '#ff6a00'];
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      // Set initial position
      confetti.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
      confetti.style.animationDuration = (Math.random() * 2 + 3) + 's'; // Random animation duration

      container.appendChild(confetti);

      // Remove confetti after animation
      setTimeout(() => {
          confetti.remove();
      }, 5000); // Time to remove confetti after 5 seconds
  }

  // Create confetti at intervals
  setInterval(createConfetti, 100); // Confetti creation interval
});


// Flip Animation and Countdown Timer
function toggleFlip() {
  const flipContainer = document.querySelector('.flip-container');
  flipContainer.classList.toggle('flip');
  initializeCountdown(); // Ensure this function is defined elsewhere
}

// Countdown Timer
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date("2025-01-01T00:00:00-03:00").getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").innerText = days;
      document.getElementById("hours").innerText = hours;
      document.getElementById("minutes").innerText = minutes;
      document.getElementById("seconds").innerText = seconds;

      if (distance < 0) {
          clearInterval(countdown);
          document.getElementById("countdown").innerText = "Feliz Aniversário!";
      }
  }, 1000);

  // Detect scrolling
  window.addEventListener("scroll", () => {
      if (window.scrollY > 50) { // Change this value as needed
          header.classList.add("scrolled");
      } else {
          header.classList.remove("scrolled");
      }
  });
});


// Image Gallery
let slideIndex = 0;
const totalSlides = document.querySelectorAll('.gallery').length;
const slidesPerPage = 5;

function mudarSlide(step) {
    slideIndex += step * slidesPerPage;
    if (slideIndex < 0) slideIndex = totalSlides - slidesPerPage;
    if (slideIndex >= totalSlides) slideIndex = 0;

    const offset = -(slideIndex * (100 / slidesPerPage));
    document.querySelector('.galeria').style.transform = `translateX(${offset}%)`;
}


// Supabase Form Submission
const form = document.getElementById('form-contato');
const mensagemResposta = document.getElementById('mensagem-resposta');

const supabaseUrl = 'YOUR_SUPABASE_URL'; // Replace with your Supabase URL
const supabaseApiKey = 'YOUR_SUPABASE_CLIENT_ANON_KEY'; // Replace with your Supabase API Key

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData);

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/Usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseApiKey,
                'Authorization': `Bearer ${supabaseApiKey}`,
            },
            body: JSON.stringify(dados),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const dadosInseridos = await response.json();
        mensagemResposta.textContent = 'Dados enviados com sucesso!';
        mensagemResposta.style.color = 'green';
        form.reset();
    } catch (error) {
        mensagemResposta.textContent = 'Erro ao enviar dados!';
        mensagemResposta.style.color = 'red';
        console.error('Error:', error);
    }
});


// Simple Quiz Functionality

let score = 0;

function checkAnswer(questionNumber, selectedAnswer) {
    // Respostas corretas
    const correctAnswers = {
        1: 1784,
        2: 'Pavonianos',
        3: 'Edição de livros'
    };

    // Verifica se a resposta está correta
    if (selectedAnswer === correctAnswers[questionNumber]) {
        alert("Resposta correta!");
    } else {
        alert("Resposta errada. Tente novamente!");
    }
}




var menuIcon = document.querySelector('.menu-icon');
var meNu = document.querySelector('.menu');

menuIcon.addEventListener('click',()=>{
  meNu.classList.contains('ativo')
}
)