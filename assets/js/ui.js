/* ─── UI helpers compartilhados ──────────────────
   Helpers que tanto a home (main.js) quanto a página
   de item (item.js) usam: mobile menu, logo split,
   reveal observer, header shadow + scroll progress,
   magnetic CTA.
─────────────────────────────────────────────── */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Mobile menu ─────────────────────── */
export const initMobileMenu = () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.querySelector('.navbar');
  if (!menuToggle || !navbar) return;

  const toggle = () => {
    const open = !navbar.classList.contains('active');
    navbar.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(open));
  };
  menuToggle.addEventListener('click', toggle);
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
  navbar.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      if (navbar.classList.contains('active')) toggle();
    })
  );
};

/* Logo: só texto plano. Hover muda cor via CSS, sem animação de letras. */

/* ─── Scroll reveal via IntersectionObserver ─── */
export const initReveal = () => {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  els.forEach((el) => observer.observe(el));
};

/* ─── Header: sombra + scroll progress ──── */
export const initHeader = () => {
  const header = document.getElementById('header');
  const progress = document.getElementById('scroll-progress');
  if (!header && !progress) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (header) {
        header.style.boxShadow = y > 10 ? '0 1px 24px rgba(200,155,108,0.06)' : 'none';
      }
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (y / max) * 100 : 0;
        progress.style.width = pct.toFixed(2) + '%';
      }
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
};

/* ─── Magnetic CTA: o botão segue o mouse ── */
const MAGNET_STRENGTH = 0.28;

export const wireMagnetic = (root = document) => {
  if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
  root.querySelectorAll('.btn-magnetic').forEach((btn) => {
    if (btn.dataset.magnet) return;
    btn.dataset.magnet = '1';
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * MAGNET_STRENGTH}px, ${y * MAGNET_STRENGTH}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
};

/* Cursor glow removido — sem círculo colorido seguindo o mouse. */

/* Theme toggle: implementado inline no <head> de cada HTML (anti-flash + sem
   dependência de ES modules). Aqui só repassamos. */

/* ─── Boot: aplica todos os helpers comuns ─── */
export const initSharedUI = () => {
  initMobileMenu();
  initReveal();
  initHeader();
  wireMagnetic();
};
