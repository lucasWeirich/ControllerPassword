const mysql = require('mysql2/promise');

module.exports = async function dbPool(req, res, next) {

    try {
        req.dbConn = await mysql.createConnection({
            host: 'localhost',
            user: 'controller_password_lucas',
            password: 'controller_password',
            database: 'controller_password'
        });
    } catch (err) {
        return res.status(500).json({ msg: 'Falha ao conetcar com o DB! ' + String(err) })
    }

    console.log('DBpool ----> Obteve conexão');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'PUT', 'DELETE', 'PATCH');
    res.setHeader('Accept', 'application/json');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');

    next();

    res.on('finish', () => {
        req.dbConn.end();
        console.log('DBpool <---- Encerrou a conexão');
    });
}