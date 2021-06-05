const sqlite3 = require('sqlite3').verbose();
const {ALL, CUD, ONE} = require('./db.utils.js');

class Connection {

    constructor(){
        this.db = new sqlite3.Database('./satoshiDB.db', this.checkConnection);
    }

    checkConnection(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.')
    }

    closeConnection(){
        const {db} = this;
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }

    

    createTable(){
        const {db} = this;
        db.serialize(() => {
            // Queries scheduled here will be serialized.
            db.run(`CREATE TABLE user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                age INTEGER NOT NULL,
                score float not null,
                password varchar(200) not null
            );`)
              .run(`INSERT INTO user(name, age, score, password) values ('Emmanuel Achana', 26, 98.2, 'RafiaBaby1')`)
              .each(`SELECT message FROM user`, (err, row) => {
                if (err){
                  throw err;
                }
                console.log(row);
              });
          });
    }

    query = (state, sql, values = [], callback) => {
        
        // execute will internally call prepare and query
        if(state === ALL){
            return this.db.all(sql, values, callback);
        }

        if(state === ONE){
            return this.db.get(sql, values, callback);
        }

        if(state === CUD){
            return this.db.run(sql, values, callback);
        }

    }
}

module.exports = new Connection().query;