module.exports = function (app) {

    let controller = {};

    //----------------------------------------------------------------------------------
    // GET /services
    controller.getServices = function (req, res) {
        new app.models.services(req.dbConn)
            .getAll()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }));
    };

    //----------------------------------------------------------------------------------
    // GET:id /services
    controller.getService = function (req, res) {
        new app.models.services(req.dbConn)
            .getOne(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // GET /services favorites
    controller.getFavoritesServices = function (req, res) {
        new app.models.services(req.dbConn)
            .getFavorites()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // GET /services search
    controller.getSearchServices = function (req, res) {
        new app.models.services(req.dbConn)
            .getSearch(`%${req.params.name}%`)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // GET /services type
    controller.getTypeServices = function (req, res) {
        new app.models.services(req.dbConn)
            .getType(`%${req.params.type}%`)
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
    // PUT /services
    controller.putServices = function (req, res) {
        new app.models.services(req.dbConn, req.body)
            .update(req.params.id)
            .then(() => res.status(201).json({ message: 'Dados atualizados com sucesso!' }))
            .catch(err => res.status(500).json({ error: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // PUT /services favorite
    controller.patchServicesFavorite = function (req, res) {
        new app.models.services(req.dbConn, req.body)
            .updateFavorite(req.params.id)
            .then(() => res.status(201).json({ message: 'Dado de favorito atualizados com sucesso!' }))
            .catch(err => res.status(500).json({ error: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // DELETE /services
    controller.deleteServices = function (req, res) {
        new app.models.services(req.dbConn)
            .delete(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(404).json({ error: err }))
    };

    return controller;
}
