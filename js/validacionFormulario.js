
// exportaciones
import { tiposError, mensajes } from "./customError";



// Validacion de formulario 

const camposDeFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    const listaRespuestas = {
        nombre: e.target.elements ["nombre"].value,
        email: e.target.elements ["email"].value,
        asunto: e.target.elements ["asunto"].value,
        mensaje: e.target.elements ["mensaje"].value,
    }
    localStorage.setItem("registro", JSON.stringify(lista))
    
})