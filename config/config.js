var path = require('path'),
        rootPath = path.normalize(__dirname + '/..'),
        env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'lagoon'
        },
        port: process.env.PORT || 3000,
        db: 'sqlite://localhost/lagoon-development',
        storage: rootPath + '/data/lagoon-development'
    },

    test: {
        root: rootPath,
        app: {
            name: 'lagoon'
        },
        port: process.env.PORT || 3000,
        db: 'sqlite://localhost/lagoon-test',
        storage: rootPath + '/data/lagoon-test'
    },

    production: {
        root: rootPath,
        app: {
            name: 'lagoon'
        },
        port: process.env.PORT || 3000,
        db: 'sqlite://localhost/lagoon-production',
        storage: rootPath + 'data/lagoon-production'
    }
};

module.exports = config[env];
