const router = require('express').Router();
const roleChangerController = require('../controllers/rollChange.controller');
const roleChangeMiddleware = require('../middlewares/validation.middleware');

module.exports = router.use('/roleChange', roleChangeMiddleware.changeRole, roleChangerController.rollChange);