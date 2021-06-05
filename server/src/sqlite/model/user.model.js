const query = require('../db/connection.js');
const { ALL } = require('../db/db.utils.js');

class UserModel {
    table = 'satoshiDB.user';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.table}`;
        let data = null;

        if (!Object.keys(params).length) {
            return query(ALL, sql, function (err, results) {
                if (!err)
                    data = results
                else data = err
            });
        }
        return data
    }
}

module.exports = new UserModel;