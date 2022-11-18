module.exports = class Dao {

    #db;
    #queries

    //----------------------------------------
    // Construtor da classe.
    constructor(db, queries) {
        this.#db = db;
        this.#queries = queries;
    }

    //----------------------------------------
    // Get all services
    getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await this.#db.execute(this.#queries.getAll);
                resolve(rows);
            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Get services
    getOne(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await this.#db.execute(this.#queries.getOne, [id]);
                resolve(rows[0]);
            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Get services favorites
    getFavorites() {
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await this.#db.execute(this.#queries.getFavorites);
                resolve(rows);
            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Search service
    getSearch(name) {
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await this.#db.execute(this.#queries.getSearch, [name]);
                resolve(rows);
            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Get type service
    getType(type) {
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await this.#db.execute(this.#queries.getType, [type]);
                resolve(rows);
            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Create service
    insert(values) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.#db.execute(this.#queries.insert, values);
                resolve(result);
            } catch (err) {
                const strErr = String(err);
                if (strErr.includes('Duplicate entry')) {
                    return reject('Entidade já cadastrada: ' + strErr);
                }
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Update service
    update(id, values) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.#db.execute(this.#queries.update, [...values, id]);
                resolve(result)
            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Update favorite of service
    updateFavorite(id, values) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.#db.execute(this.#queries.updateFavorite, [...values, id]);
                resolve(result)
            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Delete service
    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const [status] = await this.#db.execute(this.#queries.delete, [id]);
                if (status.affectedRows !== 1)
                    return reject(`Nenhum cadastro para excluir com o id: ${id}`);
                resolve(`Cadastro com id: ${id} removido com sucesso!`);
            } catch (err) {
                reject(err);
            }
        });
    }
}