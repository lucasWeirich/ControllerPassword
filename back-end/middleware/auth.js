// Biblioteca para geração do token de autenticação.
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    if (!req.headers['authorization'])
        return res.status(401).json({ message: "Token não enviado!" });

    if (req.headers['authorization'].includes('Bearer')) {

        const token = req.headers['authorization'].replace('Bearer ', '');

        jwt.verify(token, 'jwt-secret', function (err, decoded) {
            if (err) return res.status(401).json({ message: "Token Inválido!" });
            req.decodedToken = decoded;
            next();
        });
        return;
    }

    res.status(401).json({ message: "Token Inválido!" });
};