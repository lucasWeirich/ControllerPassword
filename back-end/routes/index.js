module.exports = function (app) {
    require('./services')(app);
    require('./user')(app);
}