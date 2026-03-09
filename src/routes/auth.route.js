const router = require('express').Router();
const validationMiddleware = require('../middlewares/validation.middleware');
const authController = require('../controllers/authcontroller'); 

module.exports.signUp = router.use('/signUp', validationMiddleware.signUp, authController.signUp);
module.exports.signIn = router.use('/signIn', validationMiddleware.signIn, authController.signIn);
module.exports.signOut = router.use('/signOut', authController.signOut);