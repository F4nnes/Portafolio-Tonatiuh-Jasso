// Constantes
const itemHeader = document.querySelectorAll('.menu_list_item');
const sections = document.querySelectorAll('[id]');

// Función para agregar o eliminar la clase 'active'
function toggleActiveClass(item, sectionId) {
  if (item.getAttribute('href').replace('#', '') === sectionId) {
    item.classList.add('active');
  } else {
    item.classList.remove('active');
  }
}

// Cambio de color en items de barra de navegacion
itemHeader.forEach((item) => {
  item.addEventListener('click', () => {
    // Agrega la clase 'active' al elemento que se hizo click
    item.classList.add('active');
    // Elimina la clase 'active' de los demás elementos
    itemHeader.forEach((otherItem) => {
      if (otherItem === item) return;
      otherItem.classList.remove('active');
    });

    // Identificar la seccion del documento
    const itemId = item.getAttribute('href').replace('#', '');
    const section = document.getElementById(itemId);
    const sectionTop = section.offsetTop;

    // Scroll de la seccion
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
  });
});

// Actualiza la clase 'active' en la barra de navegacion segun el div actual
window.addEventListener('scroll', () => {
  sections.forEach((section) => {
    if (section.offsetTop <= window.scrollY && section.offsetTop + section.offsetHeight > window.scrollY) {
      const sectionId = section.id;
      itemHeader.forEach((item) => {
        toggleActiveClass(item, sectionId);
      });
    }
  });
});