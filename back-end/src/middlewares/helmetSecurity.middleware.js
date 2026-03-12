const helmet = require('helmet');

module.exports = helmet({
    crossOriginEmbedderPolicy : false,
    frameguard: 'deny',
    contentSecurityPolicy: {
        directives:{
            'default-src':['self', 'https://example.com'],
            'script-src':['self', 'https://example.com'],
            'image-src':['self', 'https://example.com'],
            'style-src':['self', 'https://example.com']
        }
    }
})