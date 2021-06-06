const dotenv = require('dotenv');
const mysql = require('mysql');
dotenv.config();

const DBConfig = {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    multipleStatements: true,// this allow you to run multiple queries at once.
    database: process.env.DB_DATABASE || '',
}

const creator = `CREATE TABLE IF NOT EXISTS user 
( 
   id INT PRIMARY KEY auto_increment,
   name VARCHAR(50) NOT NULL UNIQUE , 
   age  DECIMAL(10, 0) NOT NULL, 
   score DECIMAL(10, 2) NOT NULL, 
   password CHAR(60) NOT NULL, 
   date_created datetime not null,
   date_updated datetime not null
); `

const insert = `
INSERT INTO user(name, age, score, password) values ('Emmanuel Achana', 26, 78.9, 'RafiaBaby@1')
`

class Connection {

    constructor() {
        this.db = mysql.createPool(DBConfig);

        this.checkConnection();

        // this.runQuery(creator, [], (err, data) => {
        //     console.log(err, data)
        // })
    }

    checkConnection() {
        const { db } = this;
        db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }

            if (connection) {
                connection.release();
            }

            return
        });
    }

    runQuery(sql, values, callback) {
        const { db } = this;
        db.query(sql, values, callback);
    }

    query = async (sql, values) => {
        const { db } = this;

        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            // execute will internally call prepare and query
            //this.db.execute(sql, values, callback);
            db.query(sql, values, callback)
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });
    }


}

// like ENUM
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});

module.exports = { query: new Connection().query, runQuery: new Connection().query };