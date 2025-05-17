const links = document.querySelectorAll('.nav-link');
const modules = document.querySelectorAll('.module');
const bookSection = document.getElementById('historia-wayuu');
const bookPages = document.querySelectorAll('.book-page');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const bookContainer = document.querySelector('.book-container');

const menuToggle = document.getElementById('mobile-menu'); // Unificar variable
const navList = document.querySelector('.navbar ul');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');  // Animación X
  navList.classList.toggle('active');     // Mostrar/ocultar menú
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

let currentPage = 1;
const totalPages = bookPages.length;
let isMobile = window.innerWidth <= 768 || 'ontouchstart' in window; // Detectar si es móvil

function showPage(page) {
  bookPages.forEach((pg, i) => {
    pg.style.display = (i === page - 1) ? 'block' : 'none';
  });
  if (prevBtn) prevBtn.disabled = page === 1;
  if (nextBtn) nextBtn.disabled = page === totalPages;
}

function changePage(direction) {
  currentPage += direction;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;
  showPage(currentPage);
}

// Inicializar botones si existen
if (prevBtn) prevBtn.addEventListener('click', () => changePage(-1));
if (nextBtn) nextBtn.addEventListener('click', () => changePage(1));

// Detección táctil para móviles
if (bookContainer && isMobile) {
  let startX, endX;

  bookContainer.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].screenX;
  });

  bookContainer.addEventListener('touchend', e => {
    endX = e.changedTouches[0].screenX;

    if (startX > endX + 50) changePage(1);
    else if (startX < endX - 50) changePage(-1);
  });
}

links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.dataset.target;

    modules.forEach(mod => {
      mod.style.display = 'none';
      mod.classList.remove('active'); // Remover la clase active de todas las secciones
    });

    const target = document.getElementById(targetId);
    if (target) {
      target.style.display = 'block';
      target.classList.add('active'); // Añadir la clase active a la sección actual
      window.scrollTo(0, 0);

      if (targetId === 'historia-wayuu') {
        if (!isMobile) {
          bookSection.classList.add('desktop');
          showPage(currentPage);
        } else {
          showPage(currentPage);
        }
      } else {
        bookSection.classList.remove('desktop');
      }
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  modules.forEach(mod => {
    mod.style.display = 'none';
    mod.classList.remove('active');
  });
  const inicio = document.getElementById('inicio');
  if (inicio) {
    inicio.style.display = 'block';
    inicio.classList.add('active');
  }
  if (bookSection && isMobile && document.querySelector('#historia-wayuu.active')) {
    showPage(1);
  } else if (bookSection && !isMobile && window.location.hash === '#historia-wayuu') {
    bookSection.classList.add('active', 'desktop');
    showPage(currentPage);
  } else if (bookSection && !isMobile && document.querySelector('#inicio.active')) {
    bookSection.classList.remove('desktop');
    showPage(currentPage);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-language');
  const contenidoEs = document.getElementById('nosotros-es');
  const contenidoWn = document.querySelector('.contenido-wayuunaiki');

  let enWayuunaiki = false;

  toggleBtn.addEventListener('click', () => {
    enWayuunaiki = !enWayuunaiki;

    if (enWayuunaiki) {
      contenidoEs.style.display = 'none';
      contenidoWn.style.display = 'block';
      toggleBtn.textContent = 'Cambiar a Español';
    } else {
      contenidoEs.style.display = 'block';
      contenidoWn.style.display = 'none';
      toggleBtn.textContent = 'Cambiar a Wayuunaiki';
    }
  });

  contenidoEs.style.display = 'block';
  contenidoWn.style.display = 'none';
  toggleBtn.textContent = 'Cambiar a Wayuunaiki';
});
 