const express=require('express');

let info={
    nombre:'',
    id:55,
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
let Cuestionario_ya_realizado=async(asd)=>{
   
  
        
}
const pool=require('../database');
const router=express.Router();


//OBTENER TODOS LOS CUESTIONARIOS QUE PUEDA HACER EL USUARIO
router.get('/gestioncuestionarios',async(req,res)=>{
    info.setid(req.query.idusu)
    console.log(info.getid())
    id_profe=info.getid()
    cuestionarios=await pool.query('SELECT * FROM cuestionarios_profesores' )
    res.render('links/Usuarios/gestioncuestionarios',{cuestionarios});
})
//HACER LA PRUEBA
router.get('/iniciar/:id_cuestionarios',async(req,res)=>{
    id_cuestionarios=req.params.id_cuestionarios;
    try{
  
        const rows=await pool.query('SELECT * FROM cuestionarios WHERE id_usuario=?',[info.getid()])
        i=0
        valor_encontrado="0"
        do{
            
            i++;
            console.log(rows[i].cuestionario_hecho)
            console.log(id_cuestionarios)
            if(rows[i].cuestionario_hecho == id_cuestionarios){
                valor_encontrado="1"
                console.log(rows[i].cuestionario_hecho)
                valor_de_id=rows[i].id_cuestionarios
                console.log(valor_de_id)
            }
        }while(rows.length-1 > i || rows[i].cuestionario_hecho==id_cuestionarios)   
if(valor_encontrado="1"){
    id_cuestionarios=valor_de_id
    const preguntas=await pool.query('SELECT resp_cuestionarios.id_pregunta_hecha, preguntas.id_pregunta, preguntas.descripcion,preguntas.res1,preguntas.res2,preguntas.res3,preguntas.res4,preguntas.solucion,resp_cuestionarios.solucion AS solucion_usuario FROM cuestionarios INNER JOIN resp_cuestionarios ON cuestionarios.id_cuestionarios=resp_cuestionarios.id_cuestionarios INNER JOIN preguntas ON preguntas.id_pregunta=resp_cuestionarios.id_pregunta_hecha WHERE cuestionarios.id_cuestionarios=?',[id_cuestionarios])
    console.log(preguntas)
    res.render('links/Usuarios/Resultado',{preguntas});

}
}catch(e){
console.log(e)
    id_usuario=info.getid()
                
      
        const preguntas=await pool.query('SELECT * FROM preguntas WHERE id_cuestionarios=?',[id_cuestionarios])
        res.render('links/Usuarios/respondercuestionario',{preguntas})
  
}
   
      
});
//RECIVIR LA CALIICACION Y RESPONDER CUESTIONARIO
router.post('/respondercuestionario/:id_cuestionario',async(req,res)=>{
    id_cuestionarios=req.params.id_cuestionario;
    const rows=await pool.query('SELECT * FROM cuestionarios WHERE id_usuario=?',[id_usuario])
                       try{
                        do{
                            i++;
                            if(rows[i].cuestionario_hecho != id_cuestionarios){
                                valor_encontrado="1"
                                valor_de_id=rows[i].cuestionario_hecho
                            }
                        }while(rows.length < i || rows[i].cuestionario_hecho != id_cuestionarios)   
                if(valor_encontrado="1"){
                    const preguntas=await pool.query('SELECT * FROM preguntas WHERE id_cuestionarios=?',[valor_de_id])
                    res.render('links/Usuarios/respondercuestionario',{preguntas})
              
                }
           }catch(e){
            try{
                TAMAÑO_DE_RESPUESTAS= Object.keys(req.body).length;
                //console.log(TAMAÑO_DE_RESPUESTAS)
                id_cuestionario=req.params.id_cuestionario;
                id_cuestionario_hecho=req.params.id_cuestionario;
                //console.log(id_cuestionario);    
                PREGUNTAS_CORRECTAS= await pool.query('SELECT * FROM preguntas WHERE id_cuestionarios =?',[id_cuestionario])
                
                
                NUMERO_DE_PREGUNTAS=(PREGUNTAS_CORRECTAS.length)
                if(NUMERO_DE_PREGUNTAS==TAMAÑO_DE_RESPUESTAS){
                    console.log("Entro")
                    i=0;
                    Contestadas_correctamente=0;
                    calificacion_final=0;
                    calificacion=0
                    id_usuario=info.getid(),
                    CUESTIONARIO_CREADO={
                        id_usuario:info.getid(),
                        cuestionario_hecho:id_cuestionario_hecho
                    }
                    await pool.query('INSERT INTO cuestionarios SET ?',[CUESTIONARIO_CREADO]);
        
                    const rows=await pool.query('SELECT * FROM cuestionarios WHERE id_usuario=?',[id_usuario])
                    TAMAÑO_DE_ROWS=rows.length
                    rows_correcta=JSON.stringify(rows[TAMAÑO_DE_ROWS-1].id_cuestionarios);
                    id_cuestionarios=rows_correcta;
                   do{
                        
                        SOLUCION_CORRECTA=Object.values(PREGUNTAS_CORRECTAS)[i].solucion
                        dato=Object.keys(req.body)[i]
                        VALOR_DEL_DATO=Object.values(req.body)[i]
                       
                       RESPUESTA_DEL_USUARIO={
                        id_cuestionarios:id_cuestionarios,
                        solucion:VALOR_DEL_DATO,
                        id_pregunta_hecha:dato
                    }
                    console.log("Aqui va")
                    if(SOLUCION_CORRECTA==VALOR_DEL_DATO){
                        Contestadas_correctamente=Contestadas_correctamente+1;
        
                    }
                    
                    console.log(RESPUESTA_DEL_USUARIO)
                    await pool.query('INSERT INTO resp_cuestionarios SET ?',[RESPUESTA_DEL_USUARIO]);
                        i++;
                    }while(i<NUMERO_DE_PREGUNTAS);
                    //Tenemos que hacer que en forma de bucle vaya comparando cada respuesta hasta que acabe
                    calificacion_final=(Contestadas_correctamente/NUMERO_DE_PREGUNTAS)
                    
                    calificaciones_cuestionarios={
                        id_cuestionarios:id_cuestionarios,
                        calificacion:calificacion_final
                    }
                    await pool.query('INSERT INTO calificaciones_cuestionarios SET ?',[calificaciones_cuestionarios])
                    const preguntas=await pool.query('SELECT resp_cuestionarios.id_pregunta_hecha, preguntas.id_pregunta, preguntas.descripcion,preguntas.res1,preguntas.res2,preguntas.res3,preguntas.res4,preguntas.solucion,resp_cuestionarios.solucion AS solucion_usuario FROM cuestionarios INNER JOIN resp_cuestionarios ON cuestionarios.id_cuestionarios=resp_cuestionarios.id_cuestionarios INNER JOIN preguntas ON preguntas.id_pregunta=resp_cuestionarios.id_pregunta_hecha WHERE cuestionarios.id_cuestionarios=?',[id_cuestionarios])
                    res.render('links/Usuarios/Resultado',{preguntas});
                    
                }   
                else{
                    console.log("El tamañano de respuestas dadas es menor")
                    res.redirect('/Usuario/gestioncuestionarios?idusu='+info.getid()); 
              }
                
            }catch(error){
                console.log(error)    
                res.redirect('/Usuario/gestioncuestionarios?idusu='+info.getid()); 
            }
           }
       
    
    
   
    
    });
module.exports=router;