const express=require('express')
//connect to express router
const router=express.Router();
//pull express validator
const {check,validationResult}=require('express-validator');
const config=require('config')
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
//Import json web token
const jwt=require('jsonwebtoken');
//import User schema
const User=require('../../models/User');
//GET api/users
//Register user
//public route
router.post('/',[
    //check if name field in the request.body is not empty
    check('username','Username is required').not().isEmpty(),
    //check email in the request.body is valid email
    check('email','Please include a valid email').isEmail(),
    //check if password field in request.body is at least 6 characters long
    check('password','Password should be at least 6 characters long').isLength({min:6})
],async (req,res)=>{
    //check the errors in req.body
    const errors=validationResult(req);
    //Check errors are not empty
    if(!errors.isEmpty())
    return res.status(400).json({
        errors:errors.array()
    });

    //destructing req.body 
    const {username,email,mobile,password}=req.body;
    
    try{
        //find user if same email already exists
        let user=await User.findOne({email});
        if(user)
        {
            res.status(400).json({
                errors:[{
                    msg:'User already exists'
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
    const avatar=gravatar.url(email,{
        //size
        s:'200',
        //rating
        r:'pg',
        //default
        d:'mm'
    }

    )

    user=new User({
        username,
        email,
        mobile,
        avatar,
        password
    });

    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(password,salt);
    await user.save();
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