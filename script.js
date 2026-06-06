// =======================
// BOOT SCREEN
// =======================

const bootScreen = document.getElementById("boot-screen");
const mainSite = document.getElementById("main-site");
const progressBar = document.getElementById("progress-bar");

const lines = [
  "Inicializando sistema FlowData...",
  "Conectando módulos inteligentes...",
  "Carregando projetos digitais...",
  "Sistema operacional pronto."
];

function typeLine(id, text, delay) {
  setTimeout(() => {

    const element = document.getElementById(id);
    let i = 0;

    const interval = setInterval(() => {

      element.textContent += text.charAt(i);
      i++;

      if (i >= text.length) {
        clearInterval(interval);
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

// =======================
// CONTADOR HERO
// =======================

function startCounter() {

  const counter = document.getElementById("counter");

  if (!counter) return;

  let value = 0;

  const interval = setInterval(() => {

    value += 7;

    counter.textContent = value;

    if (value >= 427) {

      counter.textContent = "427+";

      clearInterval(interval);
    }

  }, 30);
}

// =======================
// PARTICULAS
// =======================

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

    if (this.x < 0 || this.x > canvas.width)
      this.speedX *= -1;

    if (this.y < 0 || this.y > canvas.height)
      this.speedY *= -1;
  }

  draw() {

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "rgba(0,229,255,.8)";
    ctx.fill();
  }
}

function createParticles() {

  particles = [];

  const quantity =
    window.innerWidth < 768
      ? 35
      : 90;

  for (let i = 0; i < quantity; i++) {

    particles.push(
      new Particle()
    );
  }
}

function connectParticles() {

  for (let a = 0; a < particles.length; a++) {

    for (let b = a; b < particles.length; b++) {

      const dx =
        particles[a].x -
        particles[b].x;

      const dy =
        particles[a].y -
        particles[b].y;

      const distance =
        Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {

        ctx.strokeStyle =
          `rgba(255,0,60,${
            1 - distance / 120
          })`;

        ctx.lineWidth = 0.4;

        ctx.beginPath();

        ctx.moveTo(
          particles[a].x,
          particles[a].y
        );

        ctx.lineTo(
          particles[b].x,
          particles[b].y
        );

        ctx.stroke();
      }
    }
  }
}

function animateParticles() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach(particle => {

    particle.update();
    particle.draw();
  });

  connectParticles();

  requestAnimationFrame(
    animateParticles
  );
}

createParticles();
animateParticles();

window.addEventListener(
  "resize",
  () => {

    resizeCanvas();
    createParticles();
  }
);

// =======================
// SCROLL REVEAL
// =======================

const revealElements =
  document.querySelectorAll(
    ".scan-box, .project-card, .diagnostic-box, .contact-box"
  );

function revealOnScroll() {

  revealElements.forEach(el => {

    const top =
      el.getBoundingClientRect().top;

    if (
      top <
      window.innerHeight - 100
    ) {

      el.style.opacity = "1";
      el.style.transform =
        "translateY(0)";
    }
  });
}

revealElements.forEach(el => {

  el.style.opacity = "0";
  el.style.transform =
    "translateY(40px)";

  el.style.transition =
    "all .8s ease";
});

window.addEventListener(
  "scroll",
  revealOnScroll
);

revealOnScroll();

// =======================
// DIAGNÓSTICO FLOWDATA
// =======================

function analisarSegmento() {

  const segmento =
    document
      .getElementById("segmento")
      .value
      .trim();

  const resultado =
    document.getElementById(
      "resultado"
    );

  if (segmento === "") {

    resultado.innerHTML =
      "Digite um segmento para iniciar a análise.";

    return;
  }

  resultado.innerHTML = `
    <strong>
      ANÁLISE FLOWDATA:
      ${segmento.toUpperCase()}
    </strong>

    <br><br>

    ✓ Landing page de alta conversão<br>
    ✓ Integração WhatsApp<br>
    ✓ Google Meu Negócio otimizado<br>
    ✓ Automação de atendimento<br>
    ✓ Dashboard de indicadores<br>
    ✓ Captação de leads automatizada
  `;
}

// =======================
// EFEITO DE MOUSE
// =======================

document.addEventListener(
  "mousemove",
  e => {

    if (window.innerWidth < 768)
      return;

    const x =
      e.clientX /
      window.innerWidth;

    const y =
      e.clientY /
      window.innerHeight;

    document.body.style.background =
      `
      radial-gradient(
      circle at ${x * 100}% ${y * 100}%,
      rgba(255,0,60,.12),
      transparent 25%
      ),
      #030305
      `;
  }
);

// =======================
// PARALLAX HERO
// =======================

window.addEventListener(
  "scroll",
  () => {

    const hero =
      document.querySelector(
        ".hero"
      );

    if (!hero) return;

    const offset =
      window.scrollY * 0.15;

    hero.style.transform =
      `translateY(${offset}px)`;
  }
);
