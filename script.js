// BOOT SCREEN
const bootScreen = document.getElementById("boot-screen");
const mainSite = document.getElementById("main-site");
const progressBar = document.getElementById("progress-bar");

const lines = [
  "Inicializando sistema FlowData...",
  "Conectando módulos de inteligência...",
  "Carregando automações digitais...",
  "Sistema operacional pronto."
];

function typeLine(elementId, text, delay) {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    let i = 0;

    const typing = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;

      if (i >= text.length) {
        clearInterval(typing);
      }
    }, 35);
  }, delay);
}

typeLine("line1", lines[0], 300);
typeLine("line2", lines[1], 1200);
typeLine("line3", lines[2], 2200);
typeLine("line4", lines[3], 3200);

let progress = 0;

const loading = setInterval(() => {
  progress += 4;
  progressBar.style.width = progress + "%";

  if (progress >= 100) {
    clearInterval(loading);

    setTimeout(() => {
      bootScreen.style.opacity = "0";
      bootScreen.style.transition = "0.8s";

      setTimeout(() => {
        bootScreen.style.display = "none";
        mainSite.style.display = "block";
        startCounter();
      }, 800);
    }, 500);
  }
}, 120);

// CONTADOR HUD
function startCounter() {
  const counter = document.getElementById("counter");
  let value = 0;

  const interval = setInterval(() => {
    value += 9;
    counter.textContent = value;

    if (value >= 427) {
      counter.textContent = "427+";
      clearInterval(interval);
    }
  }, 30);
}

// PARTÍCULAS
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.6 - 0.3;
    this.speedY = Math.random() * 0.6 - 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "rgba(0, 229, 255, 0.75)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  particles = [];

  for (let i = 0; i < 85; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 130) {
        ctx.strokeStyle = `rgba(255, 0, 60, ${1 - distance / 130})`;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  connectParticles();
  requestAnimationFrame(animateParticles);
}

createParticles();
animateParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

// IA DE DIAGNÓSTICO
function analisarSegmento() {
  const segmento = document.getElementById("segmento").value.trim();
  const resultado = document.getElementById("resultado");

  if (segmento === "") {
    resultado.innerHTML = "Digite um segmento para iniciar a análise.";
    return;
  }

  resultado.innerHTML = `
    <strong>ANÁLISE CONCLUÍDA PARA: ${segmento.toUpperCase()}</strong><br><br>
    ✓ Site profissional de alta conversão<br>
    ✓ Landing page estratégica<br>
    ✓ WhatsApp direcionado para atendimento<br>
    ✓ Google Business otimizado<br>
    ✓ Dashboard de acompanhamento<br>
    ✓ Automação para captação de clientes
  `;
}

// EFEITO DE MOUSE NO FUNDO
document.addEventListener("mousemove", (event) => {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  document.body.style.background = `
    radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,0,60,.16), transparent 25%),
    #030305
  `;
});
