const express=require('express');
const pool=require('../database');
const router=express.Router();
const path=require('path');
const { globalAgent } = require('http');

const expresiones={
    texto: /^[a-zA-Z0-9\_\-][a-zA-Z0-9\_\-\s]{0,130}$/,
    
}
    const campos = {
        nombre_del_cuestionario:false,
        descripcion:false,
        res1:false,
        res2:false,
        res3:false,
        res4:false,
        respuestacorrecta:false  
    }
    
    const validarFormulario=(dato,valor)=>{
    
        switch (valor){
            case "nombre_del_cuestionario":
                valor="nombre_del_cuestionario";
                
                Validar(expresiones.texto , dato , valor )
    
              break;      
            case "descripcion":
                valor="descripcion";
                
                Validar(expresiones.texto , dato , valor )
    
              break;
            case "res1":
                valor="res1";
                
                Validar(expresiones.texto , dato , valor )
    
              break;
            case "res2":
                valor="res2";
                
                Validar(expresiones.texto , dato , valor )
    
              break;
            case "res3":
                valor="res3";
                
                Validar(expresiones.texto , dato , valor )
    
              break;
            case "res4":
                valor="res4";
                
                Validar(expresiones.texto , dato , valor )
    
              break;
            case "respuestacorrecta":
                valor="respuestacorrecta";
                
                Validar(expresiones.texto , dato , valor )
    
              break;
           
              
        }
    }
const Validar=(expresiones, dato, valor)=>{
        console.log(valor)
        if(expresiones.test(dato)){
            campos[valor]=true
            console.log(campos[valor])
    
        }else{
            campos[valor]=false;
            console.log(campos[valor])    
          }
        }
let info={
    nombre:'',
    id:25,
    setid: function(id){
        this.id=id;
    },
    getid:function(){
        return this.id
    },
    setnombre: function(nombre){
        this.nombre=nombre;
    },
    getnombre:function(){
        return this.nombre;
    }
}
//Crear Cuestionario
router.get('/crearcuestionario',async(req,res)=>{
    res.render('links/Profesor/crearcuestionario');
})
//Guardar Cuestionario
router.post('/crearcuestionario',async(req,res)=>{
    nombre_del_cuestionario=req.body.nombre_cuestionario
    console.log(req.body.nombre_cuestionario);
    try{
        //Necesitamos comprobar que sea 1 objeto no leer el objeto completo
        tamaño=(req.body.respuestacorrecta.length);
        existe_1_sola_pregunta=req.body.respuestacorrecta[1]
        console.log("el tamaño es"+ tamaño );
        i=0;
        errorfinal=0
          
        console.log(tamaño)
        if(tamaño == 0){
            
            //Mensaje de error de que solo hizo 0 pregunta
            res.redirect('/profesor/gestioncuestionarios?profesor='+info.getid());
            console.log("Cuestionario de tamaño 1 pregunta")
        }
        //
        else{
            //CREAMOS EL ESCENARIO
            //Comprobamos que le titulo del cuestionario este validado correctamente
            validarFormulario(nombre_del_cuestionario,valordato="nombre_del_cuestionario");
              
            if(campos.nombre_del_cuestionario){
                if(existe_1_sola_pregunta==null){
                    validarFormulario(req.body.descripcion,valordato="descripcion")
                    validarFormulario(req.body.res1, valordato="res1");
                    validarFormulario(req.body.res2,valordato="res2");
                    validarFormulario(req.body.res3,valordato="res3")
                    validarFormulario(req.body.res4,valordato="res4")
                    validarFormulario(req.body.respuestacorrecta,valordato="respuestacorrecta")
                if( campos.descripcion && campos.res1 && campos.res2 && campos.res3 && campos.res4 &&campos.respuestacorrecta){
  ///////////////////////////////    
                const id_usuario =info.getid(),
                CUESTIONARIO_CREADO={
                    id_usuario:info.getid(),
                    nombre_cuestionario:nombre_del_cuestionario
                }
                
                await pool.query('INSERT INTO cuestionarios_profesores SET ?',[CUESTIONARIO_CREADO]);
               
                //Para obtener el ultimo id hacemos una peticion a la base de datos
                //de todas las tablas creadas y tomamos la ultima entrada
                
                const rows=await pool.query('SELECT * FROM cuestionarios_profesores WHERE id_usuario=?',[id_usuario])
                //Se Usa el metodo "JSON.stringify" porque por alguna razon mysql decidio que era
                //Increible y maravilloso enviar datos en json por lo que lo tenemos que transformar a 
                //algo que pueda leer el sistema un string
                TAMAÑO_DE_ROWS=rows.length
                rows_correcta=JSON.stringify(rows[TAMAÑO_DE_ROWS-1].id_cuestionarios);
                id_cuestionarios=rows_correcta;            
                
                PREGUNTA_GUARDADA={
                    id_cuestionarios,
                    descripcion:req.body.descripcion,
                    res1:req.body.res1,
                    res2:req.body.res2,
                    res3:req.body.res3,
                    res4:req.body.res4,
                    solucion:req.body.respuestacorrecta                    
                };
                console.log(PREGUNTA_GUARDADA)
                await pool.query('INSERT INTO preguntas SET ?',[PREGUNTA_GUARDADA]);
                res.redirect('/profesor/gestioncuestionarios?profesor='+info.getid());
       
                }else{
                    res.redirect('/profesor/gestioncuestionarios?profesor='+info.getid()); 
                 }  
                }else{
                    //Bucle para comprovar todos los datos
                    Object.keys(campos).forEach(key => {
                        campos[key] = true;
                    })
                    do{
                    validarFormulario(req.body.descripcion[i],valordato="descripcion")
                    validarFormulario(req.body.res1[i], valordato="res1");
                    validarFormulario(req.body.res2[i],valordato="res2");
                    validarFormulario(req.body.res3[i],valordato="res3")
                    validarFormulario(req.body.res4[i],valordato="res4")
                    validarFormulario(req.body.respuestacorrecta[i],valordato="respuestacorrecta")
                    const error= Object.values(campos).every(
                        value => value === true,
                        
                      );
                      console.log(errorfinal)
                      if(error == false){
                        errorfinal==1
                        console.log(errorfinal)
                      }                    
                    i++;
                    }while(i<(tamaño));
                i=0;
                if(errorfinal != 1){
                    
                    const id_usuario =info.getid(),
                    CUESTIONARIO_CREADO={
                        id_usuario:info.getid(),
                        nombre_cuestionario:nombre_del_cuestionario
                    }
                    
                    await pool.query('INSERT INTO cuestionarios_profesores SET ?',[CUESTIONARIO_CREADO]);
                   
                    //Para obtener el ultimo id hacemos una peticion a la base de datos
                    //de todas las tablas creadas y tomamos la ultima entrada
                    
                    const rows=await pool.query('SELECT * FROM cuestionarios_profesores WHERE id_usuario=?',[id_usuario])
                    //Se Usa el metodo "JSON.stringify" porque por alguna razon mysql decidio que era
                    //Increible y maravilloso enviar datos en json por lo que lo tenemos que transformar a 
                    //algo que pueda leer el sistema un string
                    TAMAÑO_DE_ROWS=rows.length
                    rows_correcta=JSON.stringify(rows[TAMAÑO_DE_ROWS-1].id_cuestionarios);
                    id_cuestionarios=rows_correcta; 
                    tamaño=(req.body.respuestacorrecta.length);
                    console.log("Aqui entra"+ tamaño)           
                    do{
                        console.log(i)
                        
                        PREGUNTA_GUARDADA={
                            id_cuestionarios,
                            descripcion:req.body.descripcion[i],
                            res1:req.body.res1[i],
                            res2:req.body.res2[i],
                            res3:req.body.res3[i],
                            res4:req.body.res4[i],
                            solucion:req.body.respuestacorrecta[i]
                            
                        };
                        i++;
                        console.log(PREGUNTA_GUARDADA)
                        //console.log(PREGUNTA_GUARDADA);
                        await pool.query('INSERT INTO preguntas SET ?',[PREGUNTA_GUARDADA]);
                        console.log("GUARDO UN DATO")
                        }while(i<(tamaño));
                       
                    //////////////////////////////////////////////////////                
                        res.redirect('/profesor/gestioncuestionarios?profesor='+info.getid());  
                    }else{
                        res.redirect('/profesor/gestioncuestionarios?profesor='+info.getid()); 
                    }
                    } 
               }
               else{
                res.redirect('/profesor/gestioncuestionarios?profesor='+info.getid());
               }    
            }
            
        
            
    }catch(error){
//Mensaje de error de qe sucedio un error extra
            console.log("Sucedio un error  "+error)
            res.redirect('/profesor/gestioncuestionarios?profesor='+info.getid());

    };
    
    
    
})
//Abrir la seccion de gestion cuestionarios
router.get('/gestioncuestionarios',async(req,res)=>{
    info.setid(req.query.profesor)
    console.log(info.getid())
    id_profe=info.getid()
    cuestionarios=await pool.query('SELECT * FROM cuestionarios_profesores WHERE id_usuario=?',[id_profe])
    res.render('links/Profesor/gestioncuestionarios',{cuestionarios});
})


//Eliminar un cuestionario
router.get('/eliminar/:id_cuestionarios',async(req,res)=>{
    id_cuestionarios=req.params.id_cuestionarios;
    console.log(id_cuestionarios)
    await pool.query('DELETE FROM cuestionarios_profesores WHERE id_cuestionarios=?',[id_cuestionarios])
    
    res.redirect('/profesor/gestioncuestionarios?profesor='+info.getid());

})
//Obtener calificaciones
router.get('/calificaciones/:id_cuestionarios',async(req,res)=>{
    id_cuestionarios_parametro=req.params.id_cuestionarios;
    cuestionarios=await pool.query('SELECT cuestionarios.id_cuestionarios,usuarios.id_usuario,usuarios.usuario,cuestionarios.id_usuario,calificaciones_cuestionarios.calificacion FROM cuestionarios INNER JOIN calificaciones_cuestionarios ON cuestionarios.id_cuestionarios=calificaciones_cuestionarios.id_cuestionarios INNER JOIN usuarios ON usuarios.id_usuario=cuestionarios.id_usuario WHERE cuestionarios.cuestionario_hecho=?',[id_cuestionarios_parametro])
    res.render('links/Profesor/Calificaciones',{cuestionarios});
})
//Obtener el examen resuelto
router.get('/ver_examen/:id_cuestionarios',async(req,res)=>{
    //Buscamos el cuestionario que realizo el alumno
    id_cuestionarios_parametro=req.params.id_cuestionarios;
/*          -----------CONFIGURACION DE LA PETICION------------
VARIABLES QUE TOMAREMOS
    preguntas.id_pregunta, preguntas.descripcion,preguntas.res1,
    preguntas.res2,preguntas.res3,preguntas.res4,preguntas.solucion,
    resp_cuestionarios.solucion, resp_cuestionarios.id_pregunta_hecha
    PETICION COMPLETA
(Se colocan los datos a pedir)      SELECT resp_cuestionarios.id_pregunta_hecha, preguntas.id_pregunta, 
                                    preguntas.descripcion,preguntas.res1,preguntas.res2,preguntas.res3,
                                    preguntas.res4,preguntas.solucion,resp_cuestionarios.solucion AS solucion_usuario 
(FROM cuestionarios ya que sera     FROM cuestionarios 
nuestra tabla principal si se elije 
otra puede que los datos lleguen a repetirse 
muchas veces por error en el INNER JOIN)
                                    
(Conectamos las tablas con sus      INNER JOIN resp_cuestionarios ON cuestionarios.id_cuestionarios=resp_cuestionarios.id_cuestionarios
    respectivas datos)              INNER JOIN preguntas ON preguntas.id_pregunta=resp_cuestionarios.id_pregunta_hecha                               
                                    
                                    WHERE cuestionarios.id_cuestionarios=?      
   */

     const preguntas=await pool.query('SELECT resp_cuestionarios.id_pregunta_hecha, preguntas.id_pregunta, preguntas.descripcion,preguntas.res1,preguntas.res2,preguntas.res3,preguntas.res4,preguntas.solucion,resp_cuestionarios.solucion AS solucion_usuario FROM cuestionarios INNER JOIN resp_cuestionarios ON cuestionarios.id_cuestionarios=resp_cuestionarios.id_cuestionarios INNER JOIN preguntas ON preguntas.id_pregunta=resp_cuestionarios.id_pregunta_hecha WHERE cuestionarios.id_cuestionarios=?',[id_cuestionarios_parametro])


    console.log(preguntas)
    res.render('links/Profesor/VerExamen',{preguntas});
    })




module.exports=router;