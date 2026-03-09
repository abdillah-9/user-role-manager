module.exports = async(error, req, res, next)=>{
    return res.status(error.statusCode).json({message: error.message});    
}