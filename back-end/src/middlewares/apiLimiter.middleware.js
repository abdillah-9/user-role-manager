const logger =  require('../utils/pino');
const limiter = require('express-rate-limit');

module.exports = limiter({
    windowMs : 1000 * 60 + 60,
    max: 3,
    handler: async()=>{
        logger.warn({
            ip: req.ip,
            route: req.originalUrl
        }, "Sensitive endpoint limit exceeded");

        res.status(429).json({
            status: "fail",
            message: "Too many attempts. Please try again later."
        });
    }
})