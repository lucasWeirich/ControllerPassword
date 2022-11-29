const Dao = require('./Dao');

const queries = {
    getAll: 'SELECT * FROM controller_password.user order by u_id desc;',
    getOne: 'SELECT * FROM controller_password.user WHERE u_id=?;',
    getSearch: 'SELECT * FROM controller_password.user WHERE u_name LIKE ?;',
    insert: 'INSERT INTO controller_password.user (u_name, u_username, u_password) VALUES(?,?,?);',
    update: 'UPDATE controller_password.user SET email=?,senha=? WHERE idUsuario=?;',
    delete: 'DELETE FROM controller_password.user WHERE idUsuario=?;'
}

module.exports = class User extends Dao {

    #u_id;
    #u_name;
    #u_username;
    #u_password;

    //----------------------------------------------------------------------------
    //
    constructor(database, user) {

        super(database, queries);

        if (user) {
            this.#u_id = user.u_id;
            this.#u_name = user.u_name;
            this.#u_username = user.u_username;
            this.#u_password = user.u_password;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON() {
        return {
            id: this.#u_id,
            name: this.#u_name,
            username: this.#u_username,
            password: this.#u_password
        }
    }

    //----------------------------------------------------------------------------
    //
    toString() {
        return JSON.stringify(this.toJSON, null, 4);
    }

    //----------------------------------------------------------------------------
    //
    insert() {
        return super.insert([
            this.#u_name,
            this.#u_username,
            this.#u_password,
        ])
    }

    //----------------------------------------------------------------------------
    //
    update(id) {
        return super.update(id, [
            this.#u_name,
            this.#u_username,
            this.#u_password,
        ])
    }
}