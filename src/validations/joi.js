const joi = require('joi');

module.exports.signUp = joi.object({
    password: joi.string().required(),
    email: joi.string().required(),
    first_name: joi.string().max(20).required(),
    last_name: joi.string().max(20).required(),
    role_id: joi.string().required()
});

module.exports.signIn = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});

module.exports.changeRole = joi.object({
    email: joi.string().required(),
    role_id: joi.string().required()
});