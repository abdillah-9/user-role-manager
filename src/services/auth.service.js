const authRepositories = require('../repositories/auth.repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
require('dotenv').config();
const userDto = require('../dtos/user.dto');

module.exports.signUp = async(userInputData)=>{
    //check if email exists
    const [user] = await authRepositories.selectUserByEmail(userInputData.email);

    if(user){
        // send "Account exists" response using AppError
        throw new AppError("Account exists");
    }

    //creating tokens, hashing password and inserting user in DB
    const password = await bcrypt.hash(userInputData.password,7);

    try{
        const [role_id] = await authRepositories.insertUserRole(role_name);
        const [user_id] = await authRepositories.insertNewUser(userInputData);
    }
    catch(error){
        throw new AppError("Something went wrong", 402);
    }

    const access_token =  jwt.sign({id}, process.env.SECRET_ACCESS_KEY,{expiresIn:'15min'});
    const plain_refresh_token = jwt.sign({id}, process.env.SECRET_REFRESH_KEY,{expiresIn:'7d'});
    const refresh_token = await crypto.createHash('sha256').digest(plain_refresh_token).update('hex');
    const tokens = {access_token, refresh_token};
    const message = "You are successful signed-In";
    const statusCode = 201;

    //return DTO
    userDto(
        userInputData.id, userInputData.role, tokens, message, statusCode, userInputData.first_name, userInputData.last_name
    );
}

module.exports.signIn = async(requestBody, cookie_access_token = access_token, cookie_refresh_token = refresh_token)=>{
    //check if email is available
    try{
        const [user] = await authRepositories.selectUserByEmail(requestBody.email);
    }
    catch(error){
        throw new AppError('failed to fetch email from database', 501);
    }
    if(!user){
        throw new AppError('Account does not exist', 401);
    }

    //Now verify access_token
    const payload = jwt.verify(cookie_access_token, process.env.SECRET_ACCESS_KEY);
    const tokens = {
        access_token: cookie_access_token, refresh_token: cookie_refresh_token
    };
    const message = "You are successful signed-In";
    const statusCode = 201;

    if(payload){
       userDto(
            user.id, user.role, tokens,message,statusCode,user.first_name,user.last_name
        );
    }

    //If access_token is not valid , then let's verify refresh_token
    const refresh_token_verified = jwt.verify(user.refresh_token, process.env.SECRET_REFRESH_KEY);

    if(!refresh_token_verified){
        throw new AppError("To have access you need to sign In",501);
    }

    //If it is valid then let us compare it with our DB refresh_token
    const hashed_cookie_refresh_token = await crypto.createHash('sha256').digest(cookie_refresh_token).update('hex');

    if(hashed_cookie_refresh_token != user.refresh_token){
        throw  new AppError("Refresh token  is not valid", 501)
    }

    //regenerate tokens, update refresh_token and send DTO user res
    const new_refresh_token = jwt.sign({id:user.id},process.env.SECRET_REFRESH_KEY,{expiresIn:'7d'});

    const new_tokens = {
        access_token : jwt.sign({id:user.id},process.env.SECRET_ACCESS_KEY,{expiresIn:'15min'}), 
        refresh_token : new_refresh_token
    };

    const updateRefresh_token = await authRepositories.updateUserRefreshtoken(user.id, crypto.createHash('sha256').digest(new_refresh_token).update('hex'));

    if(!updateRefresh_token){
        throw new AppError('Something happened, please retry to login', 402);
    }
    
    userDto(
        user.id, user.role, new_tokens, message, statusCode, user.first_name, user.last_name
    );
}

module.exports.signOut = async(cookie_refresh_token = refresh_token)=>{
    //verify refresh token
    try{
        const refresh_token_payload = jwt.verify(cookie_refresh_token, process.env.SECRET_REFRESH_KEY);
    }
    catch(e){
        throw new AppError("Refresh token is not valid", 502);
    }

    const hashed_cookie_refresh_token = crypto.createHash('sha256').digest(cookie_refresh_token).update('hex');

    const db_refresh_token = [user.refresh_token] = authRepositories.selectUserById(refresh_token_payload.id);

    if(hashed_cookie_refresh_token != db_refresh_token){
        throw new AppError("Refresh token is not valid", 502);
    }

    //Remove Refresh token from DB
    await authRepositories.updateUserRefreshtoken(refresh_token_payload.id, null);
}
