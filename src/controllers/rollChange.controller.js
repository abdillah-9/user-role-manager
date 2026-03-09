const rollChangeService = require('../services/rollChange.service');

module.exports.rollChange = async (req, res, next)=>{
    return await res.status(rollChangeService.roleChange.statusCode).json(rollChangeService.roleChange);
}
