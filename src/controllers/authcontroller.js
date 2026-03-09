const authService = require('../services/auth.service');

module.exports.signUp = async (req, res, next)=>{
    
    return await res.status(authService.signUp.statusCode).json(authService.signUp);
}

module.exports.signIn = async (req,res,next)=>{
    return await res.status(authService.signIn.statusCode).json(authService.signIn);
}

module.exports.signOut = async(req, res, next)=>{
    return await res.status(authService.signOut.statusCode).json(authService.signOut);
}