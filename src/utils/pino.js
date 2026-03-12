const pino = require('pino');
require('dotenv').config();

module.exports = pino({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options:{
            colorize: true,
            translateTime:'SYS:standard',
            ignore: 'pid, hostname'
        }

    } : undefined
    
});