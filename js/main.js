/* ==========================================================
   El Extremeño · Mantenimiento y Jardines
   Interacción de la página
   ========================================================== */

/* ---------- Menú de navegación (móvil) ---------- */
const header = document.querySelector('.top');
const menuButton = document.getElementById('menu-btn');
const navLinks = [...document.querySelectorAll('.nav a')];

function setMenu(open) {
  header.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}

menuButton.addEventListener('click', () => {
  setMenu(!header.classList.contains('open'));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) setMenu(false);
});

/* ---------- Sección activa en el menú ---------- */
if ('IntersectionObserver' in window) {
  const linksById = new Map(
    navLinks.map((link) => [link.getAttribute('href').slice(1), link])
  );

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.remove('on'));
      const active = linksById.get(entry.target.id);
      if (active) active.classList.add('on');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  linksById.forEach((link, id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
}

/* ---------- Comparador antes / después ---------- */
document.querySelectorAll('[data-ba]').forEach((slider) => {
  const range = slider.querySelector('input');
  let dragging = false;

  const setPosition = (value) => {
    slider.style.setProperty('--p', value + '%');
  };

  const moveTo = (e) => {
    const box = slider.getBoundingClientRect();
    const percent = ((e.clientX - box.left) / box.width) * 100;
    const value = Math.max(0, Math.min(100, percent));
    range.value = value;
    setPosition(value);
  };

  range.addEventListener('input', () => setPosition(range.value));

  slider.addEventListener('pointerdown', (e) => {
    dragging = true;
    moveTo(e);
  });
  window.addEventListener('pointermove', (e) => {
    if (dragging) moveTo(e);
  });
  window.addEventListener('pointerup', () => {
    dragging = false;
  });
});

/* ---------- Visor de fotos ---------- */
const lightbox = document.getElementById('lb');
const lightboxImg = document.getElementById('lb-img');
const lightboxCaption = document.getElementById('lb-cap');

document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  gallery.querySelectorAll('img').forEach((img) => {
    const trigger = img.closest('button') || img.closest('figure');
    trigger.classList.add('zoomable');
    trigger.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = img.alt;
      lightbox.showModal();
    });
  });
});

document.getElementById('lb-close').addEventListener('click', () => lightbox.close());

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.close();
});

/* ---------- Vídeo: se reproduce al verlo en pantalla ---------- */
const reel = document.querySelector('.reel video');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reel && 'IntersectionObserver' in window && !reducedMotion) {
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        reel.play().catch(() => {});
      } else {
        reel.pause();
      }
    });
  }, { threshold: 0.4 }).observe(reel);
}

/* ---------- Copiar teléfono ---------- */
const copyMessage = document.getElementById('copy-msg');

function selectPhone() {
  const selection = getSelection();
  const range = document.createRange();
  range.selectNodeContents(document.getElementById('tel'));
  selection.removeAllRanges();
  selection.addRange(range);
  copyMessage.textContent = 'Número seleccionado. Cópialo con tu teclado.';
}

document.getElementById('copy').addEventListener('click', () => {
  if (!navigator.clipboard) {
    selectPhone();
    return;
  }
  navigator.clipboard.writeText('634855300')
    .then(() => {
      copyMessage.textContent = 'Número copiado: 634 85 53 00';
    })
    .catch(selectPhone);
});
