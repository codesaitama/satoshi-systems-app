const sqlite3 = require('sqlite3').verbose();
const {ALL, UPDATE, CREATE, DELETE, ONE} = require('./db.utils.js');

class Connection {

    constructor(){
        this.db = new sqlite3.Database(':memory:', this.checkConnection);
    }

    checkConnection(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.')
    }

    closeConnection(){
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }

    createTable(){
        this.db.serialize(() => {
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

    query = async (state, sql, values) => {
        
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }

            // execute will internally call prepare and query
            if(state === ALL){
                console.log({sql, values})
                this.db.all(sql, values, callback);
                return
            }

            if(state === ONE){
                this.db.get(sql, values, callback);
                return
            }

            if(state === CREATE){
                this.db.run(sql, values, callback);
                return
            }

            if(state === UPDATE){
                this.db.run(sql, values, callback);
                return
            }

            if(state === DELETE){
                this.db.run(sql, values, callback);
                return
            }

            //this.closeConnection();
            
        }).catch(err => {
            throw err;
        });
    }
}

module.exports = new Connection().query;