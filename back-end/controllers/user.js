const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = function (app) {

    let controller = {};

    //----------------------------------------------------------------------------------
    // GET /user_add
    controller.addUser = async (req, res) => {
        let hash = bcrypt.hashSync(req.body.u_password, 10);

        try {

            await req.dbConn.query(
                'INSERT INTO controller_password.user (u_name, u_username, u_password) VALUES(?,?,?);',
                [req.body.u_name, req.body.u_username, hash]
            );

            return res.status(201).json({ message: 'User added success!' });

        } catch (err) {
            res.status(500).json({ message: 'Error adding user!', error: String(err) });
        }
    };

    //----------------------------------------------------------------------------------
    // GET /user_login
    controller.loginUser = async (req, res) => {
        try {
            const [[user]] = await req.dbConn.query(
                'SELECT * FROM controller_password.user WHERE u_username LIKE ?;',
                [req.body.u_username]
            );

            if (user === undefined)
                return res.status(401).json({ message: 'User not found!' });
            if (bcrypt.compareSync(req.body.u_password, user.u_password) === false)
                return res.status(401).json({ message: 'Incorrect password !' });

            delete user.u_password;

            const token = jwt.sign(user, 'jwt-secret', {
                expiresIn: 4 * 3600 // Válido até 4 horas
            });

            return res.status(200).json({ message: 'Login realizado com sucesso!', token: token });

        } catch (err) {
            res.status(500).json({ message: 'Error ao adicionar usuário!', error: String(err) });
        }
    };

    return controller;
}