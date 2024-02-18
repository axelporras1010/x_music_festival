document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
    navScroll();
}

function navScroll(){
    const navItems = document.querySelectorAll('.nvg-bar a');

    navItems.forEach( enlace =>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const scrollItem = e.target.attributes.href.value;
            const section = document.querySelector(scrollItem);
            section.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 6; i++){
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
            <source srcset="build/img/${i}.avif"  type="image/avif">
            <source srcset="build/img/${i}.webp"  type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/${i}.jpg" alt="Imagen de Galeria">
        `;

        imagen.onclick = function () {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
        <source srcset="build/img/${id}.avif"  type="image/avif">
        <source srcset="build/img/${id}.webp"  type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/${id}.jpg" alt="Imagen de Galeria">
    `;
    
    const body = document.querySelector('body');

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function () { cerrarModal(overlay, body) }

    const boton = document.createElement('P');
    boton.textContent = 'X';
    boton.classList.add('btn-cerrar');
    boton.onclick = function () { cerrarModal(overlay, body) }
    overlay.appendChild(boton);

    
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}

function cerrarModal(overlay, body) {
    overlay.remove();
    body.classList.remove('fijar-body');
}
