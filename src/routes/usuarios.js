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
router.get('/respondercuestionario/:id_cuestionario',async(req,res)=>{
    id_cuestionario=req.params.id_cuestionario;
    console.log(id_cuestionario)
    const preguntas=await pool.query('SELECT * FROM preguntas WHERE id_cuestionarios=?',[id_cuestionario])
    console.log(preguntas)
    res.render('links/Profesor/gestioncuestionarios',{preguntas})
});
//RECIVIR LA CALIICACION
router.post('/respondercuestionario',async(req,res)=>{
        console.log(req.body)
        res.redirect('/usuario/gestioncuestionarios');
        //Tenemos que hacer que en forma de bucle vaya comparando cada respuesta hasta que acabe
        preuntas= await pool.query('SELECT * FROM preguntas WHERE id_cuestionario')
});
module.exports=router;