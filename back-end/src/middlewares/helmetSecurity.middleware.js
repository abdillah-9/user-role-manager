const helmet = require('helmet');

module.exports = helmet({
    crossOriginEmbedderPolicy: false,
    frameguard: { action: 'deny' }, // Professional update: uses object syntax
    contentSecurityPolicy: {
        directives: {
            // NOTICE THE SINGLE QUOTES INSIDE THE STRINGS:
            'default-src': ["'self'", 'https://example.com'],
            'script-src': ["'self'", 'https://example.com'],
            'image-src': ["'self'", 'https://example.com'],
            'style-src': ["'self'", 'https://example.com']
        }
    }
})
