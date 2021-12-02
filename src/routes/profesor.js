const express=require('express');
const router=express.Router();


router.get('/crearcuestionario',(req,res)=>{
    res.render('links/Profesor/crearcuestionario');
})
router.post('/crearcuestionario',async(req,res)=>{
    console.log(req.body.res1);
    const valoresres1=req.body.res1;
    console.log(valoresres1[1]);
    //CREAMOS EL CUESTIONARIO
    await pool.query('INSERT INTO preguntas SET ?',[newUser]);  
    

    //Obtengo todos los valores en una sola variable
    const todo=req.body
    console.log(todo);

    
    
    res.render('links/Profesor/crearcuestionario');
})



module.exports=router;