const express=require('express');
const router=express.Router();


router.get('/cuestionario_R1',(req,res)=>{
    res.render('links/cuestionarios/cuestionario_R1');
})
module.exports=router;