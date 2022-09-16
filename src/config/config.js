const dotenv = require('dotenv');
dotenv.config();

function checkEnv(envVar, defaultValue) {
    if (!process.env[envVar]) {
        if (defaultValue) {
            return defaultValue;
        }
        throw new Error(`Please define the Environment variable"${envVar}"`);
    } else {
        return process.env[envVar];
    }
}

const config = {
    grapeHost: checkEnv('GRAPE_HOST'),
    peerTimeout: parseInt(checkEnv('GRAPE_PEER_TIMEOUT')),
    announceTimeout: parseInt(checkEnv('GRAPE_ANNOUNCE_TIMEOUT')),
};

module.exports = config;