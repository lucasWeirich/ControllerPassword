//--------------------------------------------------
// Importação do arquivo auth.
/* const auth = require('../middleware/auth'); */

module.exports = function (app) {

    let controller = app.controllers.services;

    //--------------------------------------------------
    // Rotas com autenticação.
    app.route('/services')
        /* .all(auth) */
        .get(controller.getServices)
        .post(controller.postServices);

    app.route('/services/:id')
        /* .all(auth) */
        .get(controller.getServices)
        .put(controller.putServices)
        .delete(controller.deleteServices);

    app.route('/servicessearch/:name')
        /* .all(auth) */
        .get(controller.getSearchServices);

};