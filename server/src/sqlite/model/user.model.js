const query = require('../db/connection.js');
const {ALL} = require('../db/db.utils.js');

class UserModel{
    table = 'user';

    find = async(params = {}) => {
        let sql = `SELECT * FROM ${this.table}`;

        if (!Object.keys(params).length) {
            return await query(ALL, sql, []);
        }
        //return await query(sql, [...values]);
    }
}

module.exports = new UserModel;