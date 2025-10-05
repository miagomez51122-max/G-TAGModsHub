// ---- Loader killer + SW cleanup ----
(function () {
  const hide = () => {
    const el = document.getElementById('loading');
    if (el && !el.classList.contains('hidden')) el.classList.add('hidden');
  };
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(regs => regs.forEach(r => r.unregister()))
      .catch(() => {});
    if (window.caches && caches.keys) {
      caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
    }
  }
  document.addEventListener('DOMContentLoaded', hide);
  window.addEventListener('load', hide);
  setTimeout(hide, 4000);
})();

// Hamburger
const nav = document.querySelector('.nav');
const toggle = document.getElementById('navToggle');
const linksPanel = document.getElementById('primaryLinks');
if (toggle && nav && linksPanel){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  linksPanel.addEventListener('click', e => {
    if (e.target.closest('a') && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }
  });
}

// Scroll progress + back-to-top
const sp = document.getElementById('scrollProgress');
const toTop = document.getElementById('toTop');
const docH = () => document.documentElement.scrollHeight - document.documentElement.clientHeight;
const onScroll = () => {
  const y = window.scrollY || window.pageYOffset;
  const p = Math.max(0, Math.min(1, y / docH()));
  if (sp) sp.style.transform = `scaleX(${p})`;
  if (toTop) toTop.style.display = y > 500 ? 'inline-flex' : 'none';
};
window.addEventListener('scroll', onScroll, {passive:true});
window.addEventListener('resize', onScroll);
onScroll();
