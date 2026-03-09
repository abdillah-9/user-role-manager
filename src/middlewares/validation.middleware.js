const AppError = require('../utils/AppError');
const joiSchema = require('../validations/joi');

module.exports.signUp = async(req, res, next)=>{
    try{
        await joiSchema.signUp(req.body);
        next();
    }
    catch(e){
        const message = e.details.map((row)=>{return row.message+',\n'}).
        next(new AppError(message,401));
    }
}

module.exports.signIn = async(req,res,next)=>{
    try{
        await joiSchema.signIn(req.body);
        next();
    }
    catch(e){
        const message = e.details.map((row)=>(row.message+',\n'));
        next(new AppError(message, 401));
    }
}

module.exports.changeRole = async(req,res,next)=>{
    try{
        await joiSchema.changeRole(req.body);
        next();
    }
    catch(e){
        const message = e.details.map(row => row.message + ',\n');
        next(new AppError(message, 401));
    }
}