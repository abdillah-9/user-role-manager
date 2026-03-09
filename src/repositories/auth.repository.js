require('dotenv').config();
const db = require('../config/knex');

module.exports.selectUserByEmail = async(email) => {
    return await db('users').select('*').where({email});
}

module.exports.selectUserById = async(id) => {
    return await db('users').select('*').where({id});
}

module.exports.insertNewUser = async(userInputData) => {
    const {first_name, last_name, email, password, role_id, refresh_token} = userInputData;

    return await db('users').insert({first_name, last_name, email, password, role_id, refresh_token});
}

module.exports.insertUserRole = async(role_name) => {
    return await db('roles').insert({role_name});
}

module.exports.selectRefreshtokenByUserId = async(id) => {
    return await db('users').select('refresh_token').where({id});
}

module.exports.updateUserRefreshtoken = async(id, refresh_token)=>{
    return db('users').update({refresh_token}).where({id});
}
