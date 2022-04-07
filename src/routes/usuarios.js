const express=require('express');
let info={
    nombre:'',
    id:55,
    setid: function(id){
        this.id=id;
    },
    getid:function(){
        return this.id
    }
}
const pool=require('../database');
const router=express.Router();


//OBTENER TODOS LOS CUESTIONARIOS QUE PUEDA HACER EL USUARIO
router.get('/gestioncuestionarios',async(req,res)=>{
    id_profe=info.getid()
    cuestionarios=await pool.query('SELECT * FROM cuestionarios_profesores' )
    res.render('links/Usuarios/gestioncuestionarios',{cuestionarios});
})
//HACER LA PRUEBA
router.get('/iniciar/:id_cuestionario',async(req,res)=>{
    id_cuestionario=req.params.id_cuestionario;
    console.log(id_cuestionario)
    const preguntas=await pool.query('SELECT * FROM preguntas WHERE id_cuestionarios=?',[id_cuestionario])
    console.log(preguntas)
    res.render('links/Usuarios/respondercuestionario',{preguntas})
});
//RECIVIR LA CALIICACION
router.post('/respondercuestionario/:id_cuestionario',async(req,res)=>{
    
    try{
        TAMAÑO_DE_RESPUESTAS= Object.keys(req.body).length;
        console.log(TAMAÑO_DE_RESPUESTAS)
        id_cuestionario=req.params.id_cuestionario;
        //console.log(id_cuestionario);    
        PREGUNTAS_CORRECTAS= await pool.query('SELECT * FROM preguntas WHERE id_cuestionarios =?',[id_cuestionario])
        NUMERO_DE_PREGUNTAS=(PREGUNTAS_CORRECTAS.length)
        if(NUMERO_DE_PREGUNTAS==TAMAÑO_DE_RESPUESTAS){
            console.log("Entro")
            i=0
            console.log(req.body)
            do{
                dato=Object.keys(req.body)[i]
                console.log(dato)
                console.log(Object.values(req.body)[i])
                i++;
                console.log(i)
            }while(i<NUMERO_DE_PREGUNTAS);
            //Tenemos que hacer que en forma de bucle vaya comparando cada respuesta hasta que acabe
            res.redirect('/usuario/gestioncuestionarios');
        }   
        else{
            console.log("El tamañano de respuestas dadas es menor")
            res.redirect('/usuario/gestioncuestionarios');
        }
        
    }catch(error){
        console.log(error)
        res.redirect('/usuario/gestioncuestionarios'); 
    }
   
    
    });
module.exports=router;