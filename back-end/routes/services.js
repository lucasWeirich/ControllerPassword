//--------------------------------------------------
// Importação do arquivo auth.
const auth = require('../middleware/auth');

module.exports = function (app) {

    let controller = app.controllers.services;

    //--------------------------------------------------
    // Request /services
    app.route('/services')
        .all(auth)
        .get(controller.getServices)
        .post(controller.postServices);

    //--------------------------------------------------
    // Request /services favorites
    app.route('/services_favorites')
        .all(auth)
        .get(controller.getFavoritesServices);

    //--------------------------------------------------
    // Request /services favorites/:id
    app.route('/services_favorites/:id')
        .all(auth)
        .put(controller.patchServicesFavorite);

    //--------------------------------------------------
    // Request /services/:id
    app.route('/services/:id')
        .all(auth)
        .get(controller.getService)
        .put(controller.putServices)
        .delete(controller.deleteServices);

    //--------------------------------------------------
    // Request /services
    app.route('/services_search/:name')
        .all(auth)
        .get(controller.getSearchServices);

    //--------------------------------------------------
    // Request /services
    app.route('/services_type/:type')
        .all(auth)
        .get(controller.getTypeServices);
};