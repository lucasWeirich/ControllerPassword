//const auth = require('../middleware/auth');

module.exports = function (app) {

    let controller = app.controllers.user;

    //--------------------------------------------------
    // Request /user_add
    app.route('/user_add')
        .post(/* auth,  */controller.addUser);

    //--------------------------------------------------
    // Request /user_login
    app.route('/user_login')
        .post(controller.loginUser);
};