function getConfig() {

    var config = {
        isProduction: true,
        morganLevel: 'common'
    };

    switch (process.env.NODE_ENV) {

        case 'production':
            return config;

        case 'development':
        /* falls through */
        default:
            config.isProduction = false;
            config.morganLevel = 'dev';
            return config;
    }
}

module.exports = getConfig();