const express=require('express')
//connect to express router
const router=express.Router();
const {check,validationResult}=require('express-validator');
const config=require('config')
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
//Import json web token
const jwt=require('jsonwebtoken');
//import User schema
const User=require('../../models/User');
const auth=require('../../middleware/auth');
//POST api/auth
//Authenticate user & get request
//public route
router.get('/',auth,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);

    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/',[
    //check email in the request.body is valid email
    check('email','Please include a valid email').isEmail(),
    //check if password field in request.body is at least 6 characters long
    check('password','Password is required').exists()
],async (req,res)=>{
    //check the errors in req.body
    const errors=validationResult(req);
    //Check errors are not empty
    if(!errors.isEmpty())
    return res.status(400).json({
        errors:errors.array()
    });

    //destructing req.body 
    const {email,password}=req.body;
    let user=null;
    try{
        //find user if same email already exists
        user=await User.findOne({email});
        if(!user)
        {
            res.status(400).json({
                errors:[{
                    msg:'Invalid Credintials'
                }]
            });
        }
    }catch(error)
    {
        //display error message
        console.log(err.message);
        // set status 500 Internal server error
        res.status(500).send('Server error');
    }
    //see if user exists
    //Get users gravatar
    

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)
        {
            res.status(400).json({
                errors:[{
                    msg:'Invalid Credintials'
                }]
            });
        }
    const payload={
        user:{
            id:user.id
        }
    }

    jwt.sign(payload,
        config.get('jwtSecret'),
        {expiresIn:36000},
        (err,token)=>{
            if(err) throw err;
            res.json({token});
        });
    res.send({token});
    //Encrypt gravatar
    //Return jsonwebtoken
    res.send('User route');
    //Display request body
    console.log(req.body);
});
//export route
module.exports=router;