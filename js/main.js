// Constantes
const itemHeader = document.querySelectorAll('.menu_list_item');
const sections = document.querySelectorAll('[id]');


// Variable para almacenar el último ID de sección seleccionada
let lastSectionId = null;

// Función para agregar o eliminar la clase 'active'
function toggleActiveClass(item, sectionId) {
    item.classList.toggle('active', item.getAttribute('href').replace('#', '') === sectionId);
}

// Debounce function
function debounce(fn, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(fn, delay);
    };
}

// Throttle function
function throttle(fn, delay) {
    let timeout;
    return function () {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                fn.apply(this, arguments);
            }, delay);
        }
    };
}

// Lazy loading function
function lazyLoadSection(section) {
    // Verificar si la sección ya ha sido cargada
    if (section.getAttribute('data-loaded')) return;

    // Cargar contenido de la sección
    const sectionContent = section.querySelector('.section-content');
    const url = section.getAttribute('data-url');

    fetch(url)
        .then(response => response.text())
        .then(html => {
            sectionContent.innerHTML = html;
            section.setAttribute('data-loaded', true);
        });
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

        // Cargar sección solo cuando se hace click en el item correspondiente
        lazyLoadSection(section);
    });
});

// Actualiza la clase 'active' en la barra de navegacion segun el div actual
const handleScroll = debounce(() => {
    sections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect();
        const sectionTop = sectionRect.top + window.scrollY;
        const sectionBottom = sectionTop + sectionRect.height;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            const sectionId = section.id;

            // Verificar si la sección actual es diferente a la última sección seleccionada
            if (sectionId !== lastSectionId) {
                lastSectionId = sectionId;
                itemHeader.forEach((item) => {
                    toggleActiveClass(item, sectionId);
                });

                // Cargar sección solo cuando se hace scroll a la sección correspondiente
                lazyLoadSection(section);
            }
        }
    });
}, 100);

window.addEventListener('scroll', throttle(handleScroll, 200));

