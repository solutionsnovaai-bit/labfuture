/* ============================================================
   FUTURISTAS.AI — Prompts que Viralizam
   main.js — All Interactions, Animations & Logic
   ============================================================ */

'use strict';

// ===== LOADER =====
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderPct = document.getElementById('loader-pct');

let loadProgress = 0;
const loadInterval = setInterval(() => {
  loadProgress += Math.random() * 18 + 5;
  if (loadProgress >= 100) {
    loadProgress = 100;
    clearInterval(loadInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      initPage();
    }, 400);
  }
  loaderBar.style.width = loadProgress + '%';
  loaderPct.textContent = Math.floor(loadProgress) + '%';
}, 80);

document.body.style.overflow = 'hidden';

function initPage() {
  initCursor();
  initScrollProgress();
  initMouseGlow();
  initReveal();
  initTerminal();
  initFAQ();
  initBlobParallax();
  initLiveNotif();
  initMagneticButtons();
  initCounters();
}

// ===== CUSTOM CURSOR =====
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
}

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
  const bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ===== MOUSE GLOW =====
function initMouseGlow() {
  const glow = document.getElementById('mouse-glow');
  if (!glow) return;
  let targetX = 0, targetY = 0, curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    targetX = e.clientX; targetY = e.clientY;
  });

  function animate() {
    curX += (targetX - curX) * 0.05;
    curY += (targetY - curY) * 0.05;
    glow.style.left = curX + 'px';
    glow.style.top = curY + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// ===== TERMINAL TYPER =====
const prompts = [
  {
    text: 'Foto fotorrealista de [Marcos] saindo em câmera lenta de uma explosão, segurando uma marmita e um guaraná Antarctica, expressão séria de herói de ação, fumaça dramática ao fundo.',
    reaction: '💬 KKKKKK VAI ESSE MARCOS 😂   💬 CARA COMO VOCÊ FEZ ISSO???   💬 ME FAZ UM TAMBÉM 🙏'
  },
  {
    text: '[Ju] em reunião de diretoria séria no escritório, mas vestindo armadura medieval completa. Os colegas ao redor não acham nada estranho. Iluminação de boardroom profissional.',
    reaction: '💬 NÃO AGUENTO 😭   💬 COMO ASSIM FOTO REAL???   💬 Ju CADÊ VOCÊ HJ KKKK'
  },
  {
    text: 'Cena de blockbuster hollywoodiano: [Rafael] saindo em câmera lenta de uma explosão nuclear, segurando marmita quentinha e refrigerante 2L. Cara séria. Golden hour.',
    reaction: '💬 ISSO É FOTO OU ARTE IRMÃO   💬 APRENDE NÃO 😂   💬 EU PRECISO DISSO NA MINHA VIDA'
  },
  {
    text: '[Ana] sendo carregada nos ombros por toda a torcida após fazer o gol da virada na várzea, confetes caindo, expressão de heroína mundial. Fotorrealista.',
    reaction: '💬 ANA EU AMO VOCÊ KKKK   💬 ISSO É REAL???   💬 FAAAAZ UM PRA MIM 😭'
  }
];

let termIdx = 0;

function initTerminal() {
  const termText = document.getElementById('term-text');
  const termReaction = document.getElementById('term-reaction');
  if (!termText || !termReaction) return;
  typePrompt();
}

function typePrompt() {
  const termText = document.getElementById('term-text');
  const termReaction = document.getElementById('term-reaction');
  if (!termText || !termReaction) return;

  const p = prompts[termIdx % prompts.length];
  termIdx++;
  termText.textContent = '';
  termReaction.style.opacity = '0';
  termReaction.style.transform = 'translateY(8px)';

  let i = 0;
  const speed = 22;

  function type() {
    if (i < p.text.length) {
      termText.textContent += p.text[i++];
      setTimeout(type, speed + (Math.random() * 15));
    } else {
      setTimeout(() => {
        termReaction.textContent = p.reaction;
        termReaction.style.transition = 'all 0.4s ease';
        termReaction.style.opacity = '1';
        termReaction.style.transform = 'translateY(0)';
        setTimeout(typePrompt, 4000);
      }, 600);
    }
  }
  type();
}

// ===== FAQ =====
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ===== BLOB PARALLAX =====
function initBlobParallax() {
  const blobs = document.querySelectorAll('.blob');
  if (!blobs.length) return;

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    blobs.forEach((b, i) => {
      const speed = (i + 1) * 0.15;
      b.style.transform = `translateY(${sy * speed}px)`;
    });
  }, { passive: true });
}

// ===== LIVE NOTIFICATIONS =====
const notifData = [
  { name: 'M. Ferreira', city: 'São Paulo, SP', initials: 'MF' },
  { name: 'J. Carvalho', city: 'Rio de Janeiro, RJ', initials: 'JC' },
  { name: 'R. Santos', city: 'Belo Horizonte, MG', initials: 'RS' },
  { name: 'A. Lima', city: 'Curitiba, PR', initials: 'AL' },
  { name: 'P. Oliveira', city: 'Fortaleza, CE', initials: 'PO' },
  { name: 'C. Souza', city: 'Salvador, BA', initials: 'CS' },
  { name: 'T. Rocha', city: 'Porto Alegre, RS', initials: 'TR' },
  { name: 'B. Costa', city: 'Brasília, DF', initials: 'BC' },
];

function initLiveNotif() {
  const notif = document.getElementById('live-notif');
  const avatar = document.getElementById('notif-avatar');
  const name = document.getElementById('notif-name');
  const city = document.getElementById('notif-city');
  if (!notif) return;

  let idx = 0;
  function showNotif() {
    const d = notifData[idx % notifData.length];
    idx++;
    avatar.textContent = d.initials;
    name.textContent = d.name + ' acabou de comprar';
    city.textContent = d.city;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 4000);
    setTimeout(showNotif, 8000 + Math.random() * 5000);
  }
  setTimeout(showNotif, 5000);
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
  const btns = document.querySelectorAll('.magnetic');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => btn.style.transition = '', 400);
    });
  });
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      const duration = 1800;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = prefix + value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

// ===== CHECKOUT MODAL =====
const modal = document.getElementById('checkout-modal');
const successScreen = document.getElementById('success-screen');
const confettiCanvas = document.getElementById('confetti-canvas');
let activePayTab = 'pix';

function openCheckout() {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  updatePayDisplay();
}

function closeCheckout() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-checkout]').forEach(btn => {
  btn.addEventListener('click', openCheckout);
});

document.getElementById('modal-close')?.addEventListener('click', closeCheckout);
modal?.addEventListener('click', e => { if (e.target === modal) closeCheckout(); });

// Payment tabs
document.querySelectorAll('.pay-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activePayTab = tab.dataset.pay;
    updatePayDisplay();
  });
});

function updatePayDisplay() {
  const pixInfo = document.getElementById('pix-info');
  const cardInfo = document.getElementById('card-info');
  const boletoInfo = document.getElementById('boleto-info');
  const installInfo = document.getElementById('installment-info');

  [pixInfo, cardInfo, boletoInfo].forEach(el => el && (el.style.display = 'none'));
  if (installInfo) installInfo.style.display = 'none';

  if (activePayTab === 'pix') {
    pixInfo && (pixInfo.style.display = 'flex');
  } else if (activePayTab === 'cartao') {
    cardInfo && (cardInfo.style.display = 'block');
    if (installInfo) {
      installInfo.style.display = 'block';
      installInfo.textContent = '→ 2x R$21,53 com juros de 3,99% ao mês';
    }
  } else if (activePayTab === 'boleto') {
    boletoInfo && (boletoInfo.style.display = 'flex');
  }
}

// Form submit
document.getElementById('checkout-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = 'Processando...';
  btn.disabled = true;

  setTimeout(() => {
    closeCheckout();
    launchSuccess();
  }, 1800);
});

// ===== SUCCESS + CONFETTI =====
function launchSuccess() {
  successScreen.classList.add('open');
  document.body.style.overflow = 'hidden';
  fireConfetti();
  setTimeout(() => {
    successScreen.classList.remove('open');
    document.body.style.overflow = '';
  }, 7000);
}

function fireConfetti() {
  const canvas = confettiCanvas;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#00C8FF', '#F5C842', '#00E5A0', '#FF6B9D', '#FFFFFF', '#0090FF', '#FFB300'];
  const particles = [];

  for (let i = 0; i < 180; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      w: 8 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 6,
      vy: 3 + Math.random() * 5,
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 8,
      opacity: 1
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.rot += p.vrot;
      if (frame > 120) p.opacity -= 0.008;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (frame < 280) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// ===== KEYBOARD ESC =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCheckout();
    successScreen.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
