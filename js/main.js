// Constantes


const itemHeader = document.querySelectorAll('.menu_list_item');



itemHeader.forEach((item)=>{
    item.addEventListener('click', () => {
        item.classList.add('active');
        itemHeader.forEach((otherItem)=>{
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});