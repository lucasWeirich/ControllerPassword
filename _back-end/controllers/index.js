module.exports = function (app) {
    return {
        services: require('./services')(app),
    };
}
