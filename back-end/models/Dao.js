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
    // Verificar Retorno
    selectAll() {

        return new Promise(async (resolve, reject) => {

            try {

                const [rows] = await this.#db.execute(this.#queries.selectAll);
                resolve(rows);

            } catch (err) {
                reject(err);
            }
        });

    }

    //----------------------------------------
    // Verificar Retorno
    selectOne(id) {

        return new Promise(async (resolve, reject) => {

            try {

                const [rows] = await this.#db.execute(this.#queries.selectOne, [id]);
                resolve(rows[0]);

            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Verificar Retorno
    selectSearch(name) {

        return new Promise(async (resolve, reject) => {

            try {

                const [rows] = await this.#db.execute(this.#queries.selectSearch, [name]);
                resolve(rows);

            } catch (err) {
                reject(err);
            }
        });
    }

    //----------------------------------------
    // Verificar Effected Rows
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
    // Verificar Effected Rows
    update(id, values) {

        console.log(values + id) // Resolver aqui

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
    // Verificar Effected Rows
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