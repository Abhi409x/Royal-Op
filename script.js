// ===== PARTICLES =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    d: Math.random()
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  particles.forEach(p => {
    p.y += p.d;
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });
}
setInterval(drawParticles, 30);

// ===== TYPING =====
function typeText(el, text, i = 0) {
  if (i < text.length) {
    el.innerHTML += text.charAt(i);
    setTimeout(() => typeText(el, text, i + 1), 40);
  }
}

// ===== SCENES =====
let scenes = ["s1","s2","s3","s4","s5"];
let index = 0;

function showNext() {
  document.getElementById(scenes[index]).classList.remove("active");
  index++;
  let next = document.getElementById(scenes[index]);
  next.classList.add("active");

  let textEl = next.querySelector(".typing");
  if (textEl) {
    textEl.innerHTML = "";
    typeText(textEl, textEl.dataset.text);
  }
}

// ===== SLIDESHOW =====
let images = ["photo1.jpg","photo2.jpg","photo3.jpg","photo4.jpg"];
let i = 0;

function startSlideshow() {
  let img = document.getElementById("slideImg");

  function showImage() {
    img.classList.remove("show");

    setTimeout(() => {
      img.src = images[i];
      img.classList.add("show");
      i++;

      if (i < images.length) {
        setTimeout(showImage, 2000);
      }
    }, 500);
  }

  showImage();

  // confetti
  setTimeout(() => {
    confetti({
      particleCount: 300,
      spread: 150
    });
  }, 500);
}

// ===== START =====
document.body.addEventListener("click", () => {

  document.getElementById("music").play().catch(()=>{});

  let first = document.querySelector(".typing");
  typeText(first, first.dataset.text);

  setTimeout(showNext, 2500);
  setTimeout(showNext, 5000);
  setTimeout(showNext, 7500);
  setTimeout(() => {
    showNext();
    startSlideshow();
  }, 10000);

}, { once: true });