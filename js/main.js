// Constantes


const itemHeader = document.querySelectorAll('.menu_list_item');



// Cambio de color en items de barra de navegacion
itemHeader.forEach((item)=>{
    item.addEventListener('click', () => {
        // Agrega la clase 'active' al elemento que se hizo click
        item.classList.add('active');
        // Elimina la clase 'active' de los demás elementos
        itemHeader.forEach((otherItem)=>{
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});