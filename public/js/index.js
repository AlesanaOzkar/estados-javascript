const tarea_form = document.getElementById('tarea_form');
const template_estado = document.getElementById('template_estado').content;
const listaTareas = document.getElementById('tareas');
const inputTexto = document.getElementById('input_texto');
const fragment = document.createDocumentFragment();
 

const tareas = {}

window.addEventListener('DOMContentLoaded', (evt) => {
    pintarTareas();
});

function onSubmit(evt) {
    evt.preventDefault()
    //Obtener datos 
    const texto = inputTexto.value;


    if (texto.trim() === '')
        return false;

    //Crear tarea
    const tarea = {
        id: Date.now(),
        texto,
        estado: false,
        fecha: new Date()
    }
 
    tareas[tarea.id] = tarea;

    //Reinicia el formulario
    evt.target.reset();
    //Foco en el input
    inputTexto.focus();
    //Guardar tareas 
    guardarTarea( );
    //Muestra las tareas
    pintarTareas();
}

tarea_form.addEventListener("submit", onSubmit);
listaTareas.addEventListener("click", (evt) => {
    if(evt.target.classList.contains('btn-actualizar')){
        actualizarTarea(evt.target.dataset.id)
        evt.stopPropagation();
    }
    if(evt.target.classList.contains('btn-eliminar')){
        if(confirm('¿Deseas eliminar la tarea?')){
            eliminarTarea(evt.target.dataset.id)
            evt.stopPropagation();
        }
    }
});

const tareasGuardadas = () => {
    return JSON.parse(localStorage.getItem('tareas'));
}  

const pintarTareas = () => {

    //Elimina el contenido del DOM
    listaTareas.innerHTML = '';

    const tareas_locales = JSON.parse(localStorage.getItem('tareas'));

    Object.values(tareas_locales).forEach(tarea => {
        const templateClone = template_estado.cloneNode(true);


        const textoTemplate = templateClone.querySelector('p'); 
        textoTemplate.textContent = tarea.texto;

        if(tarea.estado){
            textoTemplate.classList.add('line-through');
            templateClone.querySelector('.alert').classList.replace('alert-primary','alert-info')
            templateClone.querySelector('.alert').classList.replace('alert-primary','alert-info') 
            templateClone.querySelector('h3 i.btn-actualizar').classList.replace('fa-check-circle','fa-undo')
 

        }else
            textoTemplate.classList.remove('line-through');

         
        templateClone.querySelector('h3 i.btn-actualizar').dataset.id = tarea.id;
        templateClone.querySelector('h3 i.btn-eliminar').dataset.id = tarea.id;
 
        fragment.appendChild(templateClone);
    });

    listaTareas.appendChild(fragment)

}

const guardarTarea = ( ) => {
    //Tareas guardadas 
    const tareas_locales = tareasGuardadas();
    //Guarda las tareas actuales
    localStorage.setItem('tareas',JSON.stringify({...tareas_locales, ...tareas}))
};


const actualizarTarea = id => {
    const tareas_locales = tareasGuardadas(); 
    tareas_locales[id].estado = !tareas_locales[id].estado; 
    localStorage.setItem('tareas',JSON.stringify({...tareas_locales})) 
    pintarTareas();
}

const eliminarTarea = id => {
    const tareas_locales = tareasGuardadas();   
    delete tareas_locales[id];   
    localStorage.setItem('tareas',JSON.stringify({...tareas_locales})) 
    pintarTareas();
}