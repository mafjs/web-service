var Config = require('maf-config');

export default function () {
    var config = new Config();


    config.set('.', {
        host: null,
        port: process.env.PORT || 8000
    });

    return config;
}
