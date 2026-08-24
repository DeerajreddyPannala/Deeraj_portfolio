// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- "Uptime" clock in status bar (playful, purely cosmetic) ----
const uptimeEl = document.getElementById('uptime');
const startTime = Date.now();

function formatUptime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `UPTIME ${h}:${m}:${s}`;
}

function tickUptime() {
  if (uptimeEl) uptimeEl.textContent = formatUptime(Date.now() - startTime);
}
setInterval(tickUptime, 1000);
tickUptime();

// ---- Hero log ticker ----
const logLines = [
  ['10:41:02', 'firewall', 'rule review complete — 0 shadowed rules found', 'ok'],
  ['10:41:19', 'siem', 'alert triaged — false positive, closed', 'ok'],
  ['10:42:03', 'network', 'uplink restored — port Gi1/0/24', 'ok'],
  ['10:43:47', 'automation', 'python script: log sweep finished, 0 anomalies', 'ok'],
  ['10:44:12', 'soc', 'incident #2291 escalation reviewed', 'ok'],
];

const ticker = document.getElementById('logTicker');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderLine(entry) {
  const [time, source, message, status] = entry;
  const span = document.createElement('div');
  span.className = 'line-item';
  span.innerHTML = `[${time}] <span class="ok">${source}</span> — ${message}`;
  return span;
}

if (ticker) {
  if (reduceMotion) {
    logLines.forEach(entry => ticker.appendChild(renderLine(entry)));
  } else {
    let i = 0;
    const showNext = () => {
      ticker.innerHTML = '';
      ticker.appendChild(renderLine(logLines[i]));
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      ticker.appendChild(cursor);
      i = (i + 1) % logLines.length;
    };
    showNext();
    setInterval(showNext, 3200);
  }
}

// ---- Cursor bubble for the Skills section ----
const skillsSection = document.getElementById('skills');
const skillCards = skillsSection?.querySelectorAll('.skill-card');
const skillTags = skillsSection?.querySelectorAll('.tag');

function updateNearestSkill(targets, pointerX, pointerY, threshold) {
  let nearest = null;
  let nearestDistance = threshold;

  targets?.forEach(target => {
    const bounds = target.getBoundingClientRect();
    const closestX = Math.max(bounds.left, Math.min(pointerX, bounds.right));
    const closestY = Math.max(bounds.top, Math.min(pointerY, bounds.bottom));
    const distance = Math.hypot(pointerX - closestX, pointerY - closestY);

    if (distance < nearestDistance) {
      nearest = target;
      nearestDistance = distance;
    }
  });

  targets?.forEach(target => target.classList.toggle('is-pointer-near', target === nearest));
}

skillsSection?.addEventListener('pointermove', event => {
  const bounds = skillsSection.getBoundingClientRect();
  skillsSection.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
  skillsSection.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
  skillsSection.classList.add('is-pointer-active');
  updateNearestSkill(skillCards, event.clientX, event.clientY, 150);
  updateNearestSkill(skillTags, event.clientX, event.clientY, 54);
});

skillsSection?.addEventListener('pointerleave', () => {
  skillsSection.classList.remove('is-pointer-active');
  skillCards?.forEach(card => card.classList.remove('is-pointer-near'));
  skillTags?.forEach(tag => tag.classList.remove('is-pointer-near'));
});

// ---- Footer year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--accent-teal)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(sec => observer.observe(sec));

// ---- Contact query modal ----
const openQueryBtn = document.getElementById('openQueryBtn');
const closeQueryBtn = document.getElementById('closeQueryBtn');
const queryModal = document.getElementById('queryModal');
const queryForm = document.getElementById('queryForm');

function toggleQueryModal(show) {
  if (!queryModal) return;
  queryModal.classList.toggle('hidden', !show);
  queryModal.setAttribute('aria-hidden', String(!show));
}

openQueryBtn?.addEventListener('click', () => toggleQueryModal(true));
closeQueryBtn?.addEventListener('click', () => toggleQueryModal(false));
queryModal?.addEventListener('click', (event) => {
  if (event.target === queryModal) toggleQueryModal(false);
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && queryModal && !queryModal.classList.contains('hidden')) {
    toggleQueryModal(false);
  }
});

queryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const name = (form.querySelector('[name="name"]')?.value || '').trim();
  const email = (form.querySelector('[name="email"]')?.value || '').trim();
  const message = (form.querySelector('[name="message"]')?.value || '').trim();

  if (!name || !email || !message) {
    return;
  }

  const subject = encodeURIComponent(`Website query from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:deerajreddy2003@gmail.com?subject=${subject}&body=${body}`;
  toggleQueryModal(false);
});
