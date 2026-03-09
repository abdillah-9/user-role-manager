const errMiddleware = require('../middlewares/error.middleware');
const router = require('express').Router();

module.exports = router.use('/error', errMiddleware);