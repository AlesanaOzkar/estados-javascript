const estado_form = document.getElementById('estado_form');
const template_estado = document.getElementById('template_estado');
const estados = document.getElementById('estados');
 
window.addEventListener('load',(evt)=>{ 
     renderizarTodo(); 
});
 
function onClick(evt){ 
    evt.preventDefault() 
    if(evt.target.id === 'publicar_estado'){
        //Obtener datos
        const relevancia = document.getElementById('relevancia').value;
        const input_estado = document.getElementById('input_estado').value;
        //Crear estado
        const estado = {
            id: new Date().getTime(),
            estado: input_estado,
            relevancia,
            fecha: new Date()
        } 
        //Obtener todos los estados
        const estados_almacenados = JSON.parse(localStorage.getItem('estados'));
        
        if (!estados_almacenados) 
            localStorage.setItem('estados',JSON.stringify( [...[],estado]))
        else
            localStorage.setItem('estados',JSON.stringify( [...estados_almacenados,estado]  ))
  
      
      // estadoElemento.innerHTML = renderizarEstado(estado);
   
        renderizarTodo();
    }   
 
} 

function onDelete(evt){
    const { id } = evt.target.dataset;

    const estados = JSON.parse(localStorage.getItem('estados'));

    estados.forEach((v,i)=>{
        if(v.id == id)
            estados.splice(i,1); 
    }) 
       localStorage.setItem('estados',JSON.stringify(estados)); 
}

estados.addEventListener('click',(evt)=>{

    if (evt.target.classList.contains('btn-eliminar')) {
        onDelete(evt);
    }


})

function renderizarEstado({id,relevancia,estado,fecha}){
    return `
        <div class="row">
            <div class="col-12 col-sm-12 col-md-8 offset-md-2">
                <div class="alert ${colorEstado(relevancia)}" role="alert">
                    <div class="d-flex justify-content-between">
                        <h4 class="alert-heading">${numeroEstado(relevancia)} </h4>
                        <button class="btn-eliminar" data-id="${id}" data-relevancia="${relevancia}" >Eliminar</button>
                    </div>
                    <p>${estado}</p>
                    <hr>
                    <p class="mb-0">Publicado el ${fecha.toString().split('T')[0]}.</p>
                </div>
            </div>
        </div> 
    `;
}
 
function renderizarTodo(){
   
    let estados_almacenados = JSON.parse(localStorage.getItem('estados'));

    if(estados_almacenados){
        estados_almacenados = estados_almacenados.sort((a,b)=>{
            if(new Date(a.fecha).getTime() > new Date(b.fecha).getTime())
                return -1;
            if(new Date(a.fecha).getTime() < new Date(b.fecha).getTime())
                return 1;
        }) 
        let texto = ''; 
        estados_almacenados.forEach(a => { 
            texto+= renderizarEstado(a); 
        }); 
        estados.innerHTML = texto;
    } 
  
}

estado_form.addEventListener("click",onClick);  


const numeroEstado = (num) => {
    return ['Triste','Normal','Feliz'][num-1]
}; 

const numeroEstado2 = num => ['Triste','Normal','Feliz'][num-1];
  
function colorEstado(estado){ 
    if(estado == 1){
        return 'alert-danger';
    } 
    else if (estado == 2){
        return 'alert-success';
    } 
    else if (estado == 3){
        return 'alert-warning';
    } 
}