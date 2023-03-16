const notFoundMiddleware=(req,res)=>{
    res.status(404).send('Route doesnot exist')
}
exports ={notFoundMiddleware};