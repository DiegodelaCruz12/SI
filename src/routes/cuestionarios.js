const express=require('express');
const router=express.Router();

router.get('/menu',(req,res)=>{
    res.render('links/cuestionarios/menu');
})
router.get('/cuestionario_R1',(req,res)=>{
    res.render('links/cuestionarios/cuestionario_R1');
})
router.get('/cuestionario_R2_1',(req,res)=>{
    res.render('links/cuestionarios/cuestionario_R2_1');
})
router.get('/cuestionario_R2_2',(req,res)=>{
    res.render('links/cuestionarios/cuestionario_R2_2');
})
router.get('/cuestionario_R3_1',(req,res)=>{
    res.render('links/cuestionarios/cuestionario_R3_1');
})
router.get('/cuestionario_R3_2',(req,res)=>{
    res.render('links/cuestionarios/cuestionario_R3_2');
})
router.get('/cuestionario_R4_1',(req,res)=>{
    res.render('links/cuestionarios/cuestionario_R4_1');
})
router.get('/cuestionario_R4_2',(req,res)=>{
    res.render('links/cuestionarios/cuestionario_R4_2');
})
router.get('/cuestionario_R5_1',(req,res)=>{
    res.render('links/cuestionarios/cuestionario_R2_1');
})
router.get('/cuestionario_R2_2',(req,res)=>{
    res.render('links/cuestionarios/cuestionario_R5_2');
})
module.exports=router;