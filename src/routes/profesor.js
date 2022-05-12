const express=require('express');

const pool=require('../database');
const router=express.Router();
const path=require('path');
const { globalAgent } = require('http');

let info={
    nombre:'',
    id:25,
    setid: function(id){
        this.id=id;
    },
    getid:function(){
        return this.id
    }
}
//Crear Cuestionario
router.get('/crearcuestionario',async(req,res)=>{
    res.render('links/Profesor/crearcuestionario');
})

router.post('/crearcuestionario',async(req,res)=>{
    nombre_del_cuestionario=req.body.nombre_cuestionario
    console.log(req.body.nombre_cuestionario);
    try{
        tamaño=(req.body.descripcion.length);
        console.log("el tamaño es"+ tamaño );
        i=0;
        console.log(tamaño)
        if(tamaño==0){
            //Mensaje de error de que solo hizo 1 pregunta
            res.redirect('/profesor/crearcuestionario');
            console.log("Cuestionario de tamaño 1 pregunta")
        }

        else{
            //CREAMOS EL ESCENARIO
            
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
            do{
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
            //console.log(PREGUNTA_GUARDADA);
            await pool.query('INSERT INTO preguntas SET ?',[PREGUNTA_GUARDADA]);
            console.log("GUARDO UN DATO")
            }while(i<(tamaño));
            res.redirect('/profesor/gestioncuestionarios');
        }
    }catch(error){
//Mensaje de error de qe sucedio un error extra
            console.log("Sucedio un error  "+error)
            res.redirect('/profesor/crearcuestionario');

    };
    
    
    
})
//Abrir la seccion de gestion cuestionarios
router.get('/gestioncuestionarios',async(req,res)=>{

    id_profe=info.getid()
    cuestionarios=await pool.query('SELECT * FROM cuestionarios_profesores WHERE id_usuario=?',[id_profe])
    res.render('links/Profesor/gestioncuestionarios',{cuestionarios});
})


Object.filter = (mainObject, filterFunction)=>
    Object.keys(mainObject)
          .filter( (ObjectKey)=>filterFunction(mainObject[ObjectKey]))
          .reduce( (result, ObjectKey)=> ( result[ObjectKey] = mainObject[ObjectKey], result ), {} );



//Eliminar un cuestionario
router.get('/eliminar/:id_cuestionarios',async(req,res)=>{
    id_cuestionarios=req.params.id_cuestionarios;
    console.log(id_cuestionarios)
    await pool.query('DELETE FROM cuestionarios_profesores WHERE id_cuestionarios=?',[id_cuestionarios])
    
    res.redirect('/profesor/gestioncuestionarios');

})
//Obtener calificaciones
router.get('/calificaciones/:id_cuestionarios',async(req,res)=>{
    id_cuestionarios_parametro=req.params.id_cuestionarios;
    cuestionarios=await pool.query('SELECT * FROM cuestionarios INNER JOIN calificaciones_cuestionarios ON cuestionarios.id_cuestionarios=calificaciones_cuestionarios.id_cuestionarios WHERE cuestionarios.cuestionario_hecho=?',[id_cuestionarios_parametro])
    console.log(cuestionarios)
    //res.render('links/Profesor/Calificaciones',{cuestionarios});
})




module.exports=router;