id=0;
function activar(){
    let div = document.getElementById("agregarpregunta");
    id=1+id;
    div.innerHTML +=`
    <div class="card" id="${id}" style="max-width: 100%; min-width:100%;">
  <div class="card-header">Pregunta
  <div class="float-right">
  <button type="button" onclick="Delete(${id})" class="btn btn-danger">
  <i class="fas fa-trash-alt"></i>
  </button>
  </div>
  </div>
  <div class="card-body">
    <div class="form-group row">
    <label class="col-sm-2 col-form-label">Pregunta </label>
    <div class="col-sm-10" >
      <input type="text" name="descripcion" class="form-control"  placeholder="DESCRIPCION DE LA PREGUNTA" id="descripcion-${id}">
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Respuesta 1</label>
    <div class="col-sm-10">
      <input type="text" name="res1" class="form-control"  placeholder="Respuesta 1"  id="res1-${id}">
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Respuesta 2</label>
    <div class="col-sm-10" >
      <input type="text" name="res2" class="form-control"  placeholder="Respuesta 2"  id="res2-${id}">
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Respuesta 3</label>
    <div class="col-sm-10">
      <input type="text" name="res3" class="form-control"  placeholder="Respuesta 3"  id="res3-${id}">
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Respuesta 4</label>
    <div class="col-sm-10" >
      <input type="text" name="res4" class="form-control"  placeholder="Respuesta 4" id="res4-${id}">
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Respuesta Correcta</label>
    <div class="col-sm-10">
    <select class="custom-select mr-sm-2" name="respuestacorrecta" >
        <option value="1">RES 1</option>
        <option value="2">RES 2</option>
        <option value="3">RES 3</option>
        <option value="4">RES 4</option>
      </select>
    </div>
  </div>
  </div>
</div>
<script src="../js/ValidacionCuestionarios.js"></script>

    `;
    
    document.getElementById('agregarpregunta').id = 'preguntaagregada';
    div.innerHTML +=`
    <div class="preguntaagregada pt-3" id="agregarpregunta">

    </div>
    `;
    }    

function Delete(id){
console.log(id)
var el=document.getElementById(id)
el.remove();
  }

