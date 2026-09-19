window.addEventListener('load', () => {
  window.setTimeout(() => document.body.classList.remove('is-loading'), 180);
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Menüyü aç' : 'Menüyü kapat');
  nav?.classList.toggle('open', !open);
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Menüyü aç');
    nav?.classList.remove('open');
  });
});

const projectCards = document.querySelectorAll('.project-card[data-href]');

function openProject(card) {
  if (card.classList.contains('is-opening')) return;

  const href = card.dataset.href;
  if (!href) return;

  card.classList.add('is-opening');
  card.setAttribute('aria-busy', 'true');

  window.setTimeout(() => {
    window.location.href = href;
  }, 360);
}

projectCards.forEach(card => {
  card.addEventListener('click', () => openProject(card));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject(card);
    }
  });
});