// Mostrar secciones al hacer clic en el menú
const links = document.querySelectorAll('.nav-link');
const modules = document.querySelectorAll('.module');

links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Oculta todos los módulos
    modules.forEach(mod => mod.style.display = 'none');

    // Muestra solo el módulo correspondiente
    const targetId = this.dataset.target;
    const target = document.getElementById(targetId);
    if (target) {
      target.style.display = 'block';
      window.scrollTo(0, 0);
    }

    if (targetId === 'historia-wayuu') {
      showPage(currentPage);
    }
  });
});

// =================== LÓGICA DEL LIBRO ====================
let currentPage = 1;
const pages = document.querySelectorAll('.book-page');
const totalPages = pages.length;

function showPage(page) {
  pages.forEach((pg, i) => {
    pg.style.display = (i === page - 1) ? 'block' : 'none';
  });
  document.getElementById('prevBtn').disabled = page === 1;
  document.getElementById('nextBtn').disabled = page === totalPages;
}

function changePage(direction) {
  currentPage += direction;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;
  showPage(currentPage);
}

// Inicializar botones
document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
document.getElementById('nextBtn').addEventListener('click', () => changePage(1));

// =================== DETECCIÓN TÁCTIL ====================
let startX, endX;
const touchArea = document.querySelector('.book-container');

touchArea.addEventListener('touchstart', e => {
  startX = e.changedTouches[0].screenX;
});

touchArea.addEventListener('touchend', e => {
  endX = e.changedTouches[0].screenX;

  if (startX > endX + 50) changePage(1);        // Deslizar a la izquierda
  else if (startX < endX - 50) changePage(-1);  // Deslizar a la derecha
});

// =================== MOSTRAR HISTORIA WAYUU AL CARGAR ====================
window.addEventListener('DOMContentLoaded', () => {
  // Mostrar solo historia-wayuu al cargar
  modules.forEach(mod => mod.style.display = 'none');
  const historia = document.getElementById('historia-wayuu');
  if (historia) {
    historia.style.display = 'block';
    showPage(currentPage);
  }
});
