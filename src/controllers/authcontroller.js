const authService = require('../services/auth.service');

module.exports.signUp = async (req, res, next)=>{
  try {
      const result = await authService.signUp(req.body);

      return res
        .status(result.statusCode)
        .json(result);

  } catch (error) {
      next(error);
  }
}

module.exports.signIn = async (req,res,next)=>{
    try{
        const result = authService.signIn(req.body);
        return await res.status(result.statusCode).json(result);
    }
    catch(e){
       next(e);
    }
}

module.exports.signOut = async(req, res, next)=>{
    try{
        const result = authService.signOut(req.body);
        const user_role_manager_access = req.cookie.user_role_manager_access;
        const user_role_manager_refresh = req.cookie.user_role_manager_refresh;
        return await res.status(result.statusCode).json(
            result,
            user_role_manager_access,
            user_role_manager_refresh
        );
    }
    catch(e){
        next(e)   
    }
}