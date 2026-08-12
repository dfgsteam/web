type AnimModule = {
  boot: () => void;
  shutdown: () => void;
};

let anim: AnimModule | null = null;
let inited = false;
let generation = 0;

function setupMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const close = document.querySelector('[data-menu-close]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
  };
  const openMenu = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');
  };

  toggle.addEventListener('click', () => {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  close?.addEventListener('click', closeMenu);
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) closeMenu();
  });
}

function setupTheme() {
  const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  if (!btn) return;
  const sync = () => {
    const dark = document.documentElement.classList.contains('dark');
    btn.setAttribute('aria-pressed', String(dark));
  };
  btn.addEventListener('click', () => {
    const dark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
    sync();
  });
  sync();
}

function loadAnimations() {
  const gen = ++generation;
  const run = () => {
    void import('./animations').then((mod) => {
      if (gen !== generation) return;
      anim = mod;
      mod.boot();
    });
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 1200 });
  } else {
    setTimeout(run, 200);
  }
}

function init() {
  if (inited) return;
  inited = true;
  setupMenu();
  setupTheme();
  loadAnimations();
}

function destroy() {
  inited = false;
  anim?.shutdown();
  anim = null;
}

document.addEventListener('astro:before-swap', destroy);
document.addEventListener('astro:page-load', init);

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init, { once: true });
}

export {};
