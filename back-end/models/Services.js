const Dao = require('./Dao');

const queries = {
    selectAll: 'SELECT * FROM controller_password.services order by s_id desc;',
    selectOne: 'SELECT * FROM controller_password.services WHERE s_id=?;',
    selectSearch: 'SELECT * FROM controller_password.services WHERE s_name LIKE ?;',
    insert: 'INSERT INTO controller_password.services (s_name,s_username,s_password,s_host,s_type,s_mofified,s_favorite) VALUES(?,?,?,?,?,?,?);',
    update: 'UPDATE controller_password.services SET s_name=?,s_username=?,s_password=?,s_host=?,s_type=?,s_modified=?, WHERE s_id=?;',
    delete: 'DELETE FROM controller_password.services WHERE s_id=?;'
}

module.exports = class Services extends Dao {

    #s_id;
    #s_name;
    #s_username;
    #s_password;
    #s_host;
    #s_type;
    #s_modified;
    #s_favorite;

    //----------------------------------------------------------------------------
    //
    constructor(database, services) {

        super(database, queries);

        if (services) {
            this.#s_id = services.s_id;
            this.#s_name = services.s_name;
            this.#s_username = services.s_username;
            this.#s_password = services.s_password;
            this.#s_host = services.s_host;
            this.#s_type = services.s_type;
            this.#s_modified = services.s_modified;
            this.#s_favorite = services.s_favorite;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON() {
        return {
            id: this.#s_id,
            name: this.#s_name,
            username: this.#s_username,
            password: this.#s_password,
            host: this.#s_host,
            type: this.#s_type,
            modified: this.#s_modified,
            favorite: this.#s_favorite
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
            this.#s_name,
            this.#s_username,
            this.#s_password,
            this.#s_host,
            this.#s_type,
            this.#s_modified,
        ])
    }

    //----------------------------------------------------------------------------
    //
    update(id) {
        return super.update(id, [
            this.#s_name,
            this.#s_username,
            this.#s_password,
            this.#s_host,
            this.#s_type,
            this.#s_modified
        ])
    }
}