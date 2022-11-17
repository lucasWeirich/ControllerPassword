module.exports = function (app) {

    let controller = {};

    //----------------------------------------------------------------------------------
    // GET /services
    controller.getServices = function (req, res) {

        new app.models.services(req.dbConn)
            .selectAll()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }));
    };

    //----------------------------------------------------------------------------------
    // GET /services_search
    controller.getSearchServices = function (req, res) {

        new app.models.services(req.dbConn).selectSearch(`%${req.params.name}%`)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // POST /services
    controller.postServices = function (req, res) {

        new app.models.services(req.dbConn, req.body)
            .insert()
            .then(() => res.status(201).json({ message: 'Dados armazenados com sucesso!' }))
            .catch(err => res.status(500).json({ message: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // GET:id /services
    controller.getServices = function (req, res) {

        new app.models.services(req.dbConn).selectOne(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // PUT /services
    controller.putServices = function (req, res) {

        new app.models.services(req.dbConn, req.body).update(req.params.id)
            .then(() => res.status(201).json({ message: 'Dados atualizados com sucesso!' }))
            .catch(err => res.status(500).json({ error: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // DELETE /services
    controller.deleteServices = function (req, res) {

        new app.models.services(req.dbConn).delete(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(404).json({ error: err }))
    };

    return controller;
}
