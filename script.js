// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
  }, 2000);
});

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
  if (!progressBar) return;
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
}

// ===== DARK MODE TOGGLE =====
const darkBtn = document.getElementById('dark-toggle');
let isDark = localStorage.getItem('darkMode') === 'true';

function applyDark() {
  document.documentElement.classList.toggle('dark', isDark);
  if (darkBtn) darkBtn.textContent = isDark ? '☀️' : '🌙';
}
applyDark();

if (darkBtn) {
  darkBtn.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('darkMode', isDark);
    applyDark();
  });
}

// ===== CUSTOM CURSOR =====
const cursorGlow = document.getElementById('cursor-glow');
const cursorDot  = document.getElementById('cursor-dot');
let mx = -100, my = -100, gx = -100, gy = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursorDot) { cursorDot.style.left = mx + 'px'; cursorDot.style.top = my + 'px'; }
});
(function animateCursor() {
  gx += (mx - gx) * 0.12; gy += (my - gy) * 0.12;
  if (cursorGlow) { cursorGlow.style.left = gx + 'px'; cursorGlow.style.top = gy + 'px'; }
  requestAnimationFrame(animateCursor);
})();
document.querySelectorAll('a, button, .portfolio-card, .skill-card, .about-card').forEach(el => {
  el.addEventListener('mouseenter', () => { if (cursorGlow) { cursorGlow.style.width='60px'; cursorGlow.style.height='60px'; }});
  el.addEventListener('mouseleave', () => { if (cursorGlow) { cursorGlow.style.width='28px'; cursorGlow.style.height='28px'; }});
});

// ===== TYPING ANIMATION =====
const phrases = [
  'Dream Big, Shine Bright ⭐',
  'UI/UX Enthusiast 🎨',
  'Future BUMN Employee 🏢',
  'Creative & Passionate 💡',
  'Always Learning 📚'
];
let pIdx = 0, cIdx = 0, deleting = false;
const typingEl = document.getElementById('typing-text');
function typeLoop() {
  if (!typingEl) return;
  const current = phrases[pIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    setTimeout(typeLoop, 75);
  } else {
    typingEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(typeLoop, 400); return; }
    setTimeout(typeLoop, 38);
  }
}
setTimeout(typeLoop, 2400);

// ===== PARTICLES =====
(function() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const COLORS = ['#e91e8c','#9c27b0','#7b2ff7','#f472b6','#c084fc','#fbbf24'];
  const rand = (a,b) => Math.random()*(b-a)+a;
  const particles = Array.from({length:60}, () => ({
    x: rand(0,window.innerWidth), y: rand(0,window.innerHeight),
    r: rand(1.5,4.5), dx: rand(-0.35,0.35), dy: rand(-0.5,-0.1),
    alpha: rand(0.15,0.65), color: COLORS[Math.floor(Math.random()*COLORS.length)]
  }));
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.y < -10) { p.y = H+10; p.x = rand(0,W); }
      if (p.x < -10) p.x = W+10;
      if (p.x > W+10) p.x = -10;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== STATS COUNTER =====
function animateCounters() {
  document.querySelectorAll('.stat-number:not([data-done])').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 40) {
      el.dataset.done = '1';
      const target = parseInt(el.getAttribute('data-target'));
      let current = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 50);
    }
  });
}

// ===== 3D TILT on portfolio cards =====
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y*8}deg) rotateY(${x*8}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease, box-shadow 0.3s';
  });
});

// ===== NAVBAR ACTIVE =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveNav() {
  const navH = document.querySelector('.navbar').offsetHeight;
  let cur = '';
  sections.forEach(s => { if (s.getBoundingClientRect().top <= navH + 120) cur = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('data-target') === cur));
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });
  // Close menu when a nav link is clicked
  navLinksEl.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });
}

// ===== SMOOTH SCROLL =====
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.getElementById(this.getAttribute('data-target'));
    if (!target) return;
    const navH = document.querySelector('.navbar').offsetHeight;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
  });
});

// ===== SKILL BARS =====
function animateSkills() {
  document.querySelectorAll('.skill-fill:not([data-animated])').forEach(fill => {
    if (fill.getBoundingClientRect().top < window.innerHeight - 40) {
      fill.dataset.animated = '1';
      fill.style.width = fill.getAttribute('data-width') + '%';
    }
  });
}

// ===== SCROLL REVEAL =====
function runReveal() {
  document.querySelectorAll('.reveal-card:not(.revealed)').forEach((el, i) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 40) {
      el.style.transitionDelay = (i % 4) * 0.07 + 's';
      el.classList.add('revealed');
    }
  });
}

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
function handleScrollTop() {
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}

// ===== NAVBAR SHADOW =====
const navbar = document.querySelector('.navbar');
function handleNavShadow() {
  if (navbar) navbar.style.boxShadow = window.scrollY > 20
    ? '0 4px 30px rgba(233,30,140,0.18)'
    : '0 2px 30px rgba(233,30,140,0.08)';
}

// ===== SPARKLE =====
const sparkle = document.querySelector('.nav-sparkle');
if (sparkle) {
  sparkle.addEventListener('click', () => {
    sparkle.style.transition = 'transform 0.5s';
    sparkle.style.transform = 'rotate(360deg) scale(1.6)';
    setTimeout(() => { sparkle.style.transform = ''; }, 500);
  });
}

// ===== SCROLL HANDLER =====
window.addEventListener('scroll', () => {
  updateActiveNav();
  animateSkills();
  runReveal();
  handleScrollTop();
  handleNavShadow();
  animateCounters();
  updateProgress();
}, { passive: true });

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.about-card, .skill-card, .portfolio-card').forEach(el => {
    el.classList.add('reveal-card');
  });
  updateActiveNav();
  animateSkills();
  runReveal();
  handleScrollTop();
  animateCounters();
  updateProgress();
  setTimeout(runReveal, 200);
  setTimeout(runReveal, 600);
});
