const express=require('express')
//connect to express router
const router=express.Router();


//GET api/posts
//Test route
//public route
router.get('/',(req,res)=>res.send('Posts route'));
//export route
module.exports=router;