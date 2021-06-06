const {query} = require('../db/connection.js');
const {multipleColumnSet} = require('../utils.min.js');

class UserModel {
    table = 'user';

    find = async(params = {}) => {
        let sql = `SELECT * FROM ${this.table}`;

        if (!Object.keys(params).length) {
            return await query(sql, []);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.table}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ name, age, score, password }) => {
        const sql = `INSERT INTO ${this.table}
        (name, age, score, password) VALUES (?,?,?,?)`;

        const result = await query(sql, [name, age, score, password]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

}

module.exports = new UserModel;