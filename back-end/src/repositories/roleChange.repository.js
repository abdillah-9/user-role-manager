const db = require('../config/knex');

module.exports = async(id, role_id)=>{
    return await db('roles').update({role_id}).where({id});
}