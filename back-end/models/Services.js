const Dao = require('./Dao');

const queries = {
    getAll: 'SELECT * FROM controller_password.services order by id desc;',
    getOne: 'SELECT * FROM controller_password.services WHERE id=?;',
    getFavorites: 'SELECT * FROM controller_password.services WHERE favorite=1;',
    getSearch: 'SELECT * FROM controller_password.services WHERE name LIKE ?;',
    insert: 'INSERT INTO controller_password.services (name,username,password,host,type,modified) VALUES(?,?,?,?,?,?);',
    update: 'UPDATE controller_password.services SET name=?,username=?,password=?,host=?,type=?,modified=? WHERE id=?;',
    updateFavorite: 'UPDATE controller_password.services SET favorite=? WHERE id=?;',
    delete: 'DELETE FROM controller_password.services WHERE id=?;'
}

module.exports = class Services extends Dao {

    #id;
    #name;
    #username;
    #password;
    #host;
    #type;
    #modified;
    #favorite;
    //----------------------------------------------------------------------------
    //
    constructor(database, services) {
        super(database, queries);

        if (services) {
            this.#id = services.id;
            this.#name = services.name;
            this.#username = services.username;
            this.#password = services.password;
            this.#host = services.host;
            this.#type = services.type;
            this.#modified = services.modified;
            this.#favorite = services.favorite;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            username: this.#username,
            password: this.#password,
            host: this.#host,
            type: this.#type,
            modified: this.#modified,
            favorite: this.#favorite,
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
            this.#name,
            this.#username,
            this.#password,
            this.#host,
            this.#type,
            this.#modified
        ])
    }

    //----------------------------------------------------------------------------
    //
    update(id) {
        return super.update(id, [
            this.#name,
            this.#username,
            this.#password,
            this.#host,
            this.#type,
            this.#modified
        ])
    }

    //----------------------------------------------------------------------------
    //
    updateFavorite(id) {
        return super.updateFavorite(id, [
            this.#favorite,
        ])
    }
}