const formulario=document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones={
    texto: /[A-Za-z0-9¿¡."][A-Za-z0-9!?\?."]{4,130}$/
    //texto:/^[a-zA-Z0-9\_\-]{4,16}$/
}
const Validar=(expresiones,input,campo)=>{
    if(expresiones.test(input.value)){
        div=document.getElementById(campo)
        div.classList.add('correcto');
        try{div.classList.remove('incorrecto');}catch(a){}
        try{div.classList.remove("border-danger");}catch(a){}
        div.classList.add("border-success");
    }else{
        div=document.getElementById(campo)
        try{div.classList.remove('correcto');}catch(a){}
        div.classList.add('incorrecto');
        try{div.classList.remove("border-success");}catch(a){}
        div.classList.add("border-danger");
        
        console.log("Else")
      }

}

const validarFormulario=(e)=>{
    id_pregunta=e.target.id
    switch (e.target.name){
        case "nombre_cuestionario":
            Validar(expresiones.texto,e.target,e.target.name)
          break;
        case "descripcion":
            Validar(expresiones.texto,e.target,e.target.name)
        break;
        case "res1":
            Validar(expresiones.texto,e.target,e.target.name)
        break;
        case "res2":
            Validar(expresiones.texto,e.target,e.target.name)
        break;
        case "res3":
            Validar(expresiones.texto,e.target,e.target.name)
        break;
        case "res4":
            Validar(expresiones.texto,e.target,e.target.name)
        break;
        
    }
} 

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
function validateForm(){
    if(campos.usuario && campos.nombre && campos.apellido_materno && campos.apellido_paterno && campos.email){
        console.log("error")
        return true;
}else{
    return false
}
}