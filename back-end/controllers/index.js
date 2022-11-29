module.exports = function (app) {
    return {
        services: require('./services')(app),
        user: require('./user')(app),
    };
}
