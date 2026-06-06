// ======================
// BOOT SCREEN
// ======================

const bootScreen = document.getElementById("boot-screen");
const mainSite = document.getElementById("main-site");
const progressBar = document.getElementById("progress-bar");

const mensagens = [
  "Inicializando FlowData...",
  "Carregando módulos inteligentes...",
  "Conectando projetos...",
  "Sistema operacional pronto."
];

function escreverLinha(id, texto, delay) {

  setTimeout(() => {

    const elemento = document.getElementById(id);

    let i = 0;

    const efeito = setInterval(() => {

      elemento.textContent += texto.charAt(i);

      i++;

      if(i >= texto.length){
        clearInterval(efeito);
      }

    }, 35);

  }, delay);

}

escreverLinha("line1", mensagens[0], 300);
escreverLinha("line2", mensagens[1], 1200);
escreverLinha("line3", mensagens[2], 2200);
escreverLinha("line4", mensagens[3], 3200);

let progresso = 0;

const carregamento = setInterval(() => {

  progresso += 4;

  progressBar.style.width = progresso + "%";

  if(progresso >= 100){

    clearInterval(carregamento);

    setTimeout(() => {

      bootScreen.style.opacity = "0";
      bootScreen.style.transition = "1s";

      setTimeout(() => {

        bootScreen.style.display = "none";
        mainSite.style.display = "block";

        iniciarContadores();

      }, 1000);

    }, 500);
  }

}, 120);

// ======================
// CONTADOR HERO
// ======================

function iniciarContadores(){

  const contador = document.getElementById("counter");

  if(!contador) return;

  let valor = 0;

  const intervalo = setInterval(() => {

    valor += 7;

    contador.textContent = valor;

    if(valor >= 427){

      contador.textContent = "427+";

      clearInterval(intervalo);
    }

  }, 25);
}

// ======================
// PARTICULAS
// ======================

const canvas = document.getElementById("particles");

if(canvas){

  const ctx = canvas.getContext("2d");

  let particulas = [];

  function redimensionar(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  redimensionar();

  class Particula{

    constructor(){

      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;

      this.raio = Math.random() * 2 + 1;

      this.vx = Math.random() * 0.6 - 0.3;
      this.vy = Math.random() * 0.6 - 0.3;
    }

    mover(){

      this.x += this.vx;
      this.y += this.vy;

      if(this.x < 0 || this.x > canvas.width)
        this.vx *= -1;

      if(this.y < 0 || this.y > canvas.height)
        this.vy *= -1;
    }

    desenhar(){

      ctx.beginPath();

      ctx.arc(
        this.x,
        this.y,
        this.raio,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "rgba(0,229,255,.8)";
      ctx.fill();
    }

  }

  function criarParticulas(){

    particulas = [];

    const quantidade =
      window.innerWidth < 768
      ? 35
      : 90;

    for(let i=0;i<quantidade;i++){

      particulas.push(
        new Particula()
      );
    }
  }

  function conectar(){

    for(let a=0;a<particulas.length;a++){

      for(let b=a;b<particulas.length;b++){

        const dx =
          particulas[a].x -
          particulas[b].x;

        const dy =
          particulas[a].y -
          particulas[b].y;

        const distancia =
          Math.sqrt(dx*dx + dy*dy);

        if(distancia < 120){

          ctx.strokeStyle =
            `rgba(255,0,60,${
              1 - distancia / 120
            })`;

          ctx.lineWidth = 0.4;

          ctx.beginPath();

          ctx.moveTo(
            particulas[a].x,
            particulas[a].y
          );

          ctx.lineTo(
            particulas[b].x,
            particulas[b].y
          );

          ctx.stroke();
        }
      }
    }
  }

  function animar(){

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    particulas.forEach(p => {

      p.mover();
      p.desenhar();

    });

    conectar();

    requestAnimationFrame(animar);
  }

  criarParticulas();
  animar();

  window.addEventListener(
    "resize",
    () => {

      redimensionar();
      criarParticulas();
    }
  );
}

// ======================
// ANIMAÇÃO SCROLL
// ======================

const elementos = document.querySelectorAll(
  ".project-card, .step, .stat-card, .contact-box"
);

elementos.forEach(el => {

  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "all .8s ease";

});

function revelar(){

  elementos.forEach(el => {

    const topo =
      el.getBoundingClientRect().top;

    if(
      topo <
      window.innerHeight - 100
    ){

      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }

  });

}

window.addEventListener(
  "scroll",
  revelar
);

revelar();

// ======================
// EFEITO MOUSE
// ======================

document.addEventListener(
  "mousemove",
  e => {

    if(window.innerWidth < 768)
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
        circle at ${x*100}% ${y*100}%,
        rgba(255,0,60,.10),
        transparent 25%
      ),
      #030305
      `;
  }
);

// ======================
// PARALLAX HERO
// ======================

window.addEventListener(
  "scroll",
  () => {

    const hero =
      document.querySelector(".hero");

    if(!hero) return;

    const deslocamento =
      window.scrollY * 0.12;

    hero.style.transform =
      `translateY(${deslocamento}px)`;
  }
);
