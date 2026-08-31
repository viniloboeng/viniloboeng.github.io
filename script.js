/* ============================================================
   VL Maintenance — script.js
   ============================================================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ---- Particles ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 20}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${8 + Math.random() * 12}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ---- Animated counters ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ---- Intersection Observer — reveal & counters ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.servico-card, .diferencial-item, .pilar, .contato-card, .sobre-card-main').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ---- Contact form → WhatsApp redirect ----
document.getElementById('contato-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome      = document.getElementById('nome').value.trim();
  const telefone  = document.getElementById('telefone').value.trim();
  const maquina   = document.getElementById('maquina').value.trim();
  const descricao = document.getElementById('descricao').value.trim();

  let msg = `Olá! Gostaria de solicitar um orçamento.\n\n`;
  if (nome)      msg += `*Nome/Empresa:* ${nome}\n`;
  if (telefone)  msg += `*Telefone:* ${telefone}\n`;
  if (maquina)   msg += `*Equipamento:* ${maquina}\n`;
  if (descricao) msg += `\n*Problema descrito:*\n${descricao}`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/5541996447931?text=${encoded}`, '_blank');
});

// ---- Smooth active nav link highlight on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// Add active style dynamically
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--blue-500) !important; }
.nav-link.active::after { transform: scaleX(1) !important; }`;
document.head.appendChild(style);
