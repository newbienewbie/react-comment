const path=require('path');
const express=require('express');


const router=express.Router();
router.use(express.static(path.join(__dirname,"../../view")));
router.use(express.static(path.join(__dirname,"../../../precompile")));


module.exports=router;