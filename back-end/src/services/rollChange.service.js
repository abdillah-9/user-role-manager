const rollChange = require('../repositories/roleChange.repository');
const AppError = require('../utils/AppError');
const rollchangeDTO = require('../dtos/roleChange.dto');

module.exports.roleChange = async(id, new_role_id = role_id)=>{
    try{
        await rollChange(id , new_role_id);
        const message = "User role updated";
        const statusCode = 200;

        return rollchangeDTO(message, statusCode);
    }  
    catch(e){
        throw new AppError("Something happened, role is not changed", 502);
    }      
}