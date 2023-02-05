const mongoose=require('mongoose')
//Creating mongoDB User Schema

const UserSchema=new mongoose.Schema({
    //user name
    username:{
        type:String,
        //Name is required
        required:true
    },
    //user email
    email:{
        type:String,
        required:true,
        //Email should be unique
        unique:true
    },
     //user mobile
     mobile:{
        type:String,
        required:true,
        //Mobile should be unique
        unique:true
    },
    //user password
    password:{
        type:String,
        required:true
    },
    //user avatar
    avatar:{
        type:String
    },
    //current time
    date:{
        type:Date,
        default:Date.now()
    }


});

//export user schema
module.exports=User=mongoose.model('user',UserSchema);