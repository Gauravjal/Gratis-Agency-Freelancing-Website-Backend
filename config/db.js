const mongoose=require('mongoose')
const config=require('config')
//get mongoDB sever url
const db=config.get('mongoUrl')

const connectDB=async ()=>{
    try{
        //set strict query false to suppress the warning
        mongoose.set("strictQuery", false);
        //asyncronous method to connect to database
        await mongoose.connect(db,{
            //use this if you create lot of connections and don't want to copy/paste
            useNewUrlParser:true
        });

        //Display message for confirmation of database connection
        console.log('Connected to database')
    }
    catch(err)
    {
        //Display the error message
        console.error(err);
        //end process with code 1
        process.exit(1);
    }
}

module.exports=connectDB;