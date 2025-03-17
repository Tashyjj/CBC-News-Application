const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class Users {
    //find a user by username
    static findByUsernameAndPassword(username, password, callback) {
        const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
        db.get(query, [username, password], (err, row) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, row);
        });
    }

    //new user
    static createUser(username, password, callback) {
        const query = 'INSERT INTO Users (username, password, level) VALUES (?, ?, ?)';
        db.run(query, [username, password, 'member'], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    }

    //get all users
    static getAllUsers() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Users';
            db.all(query, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    //delete user
    static deleteUser(username) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Users WHERE username = ?';
            db.run(query, [username], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}




module.exports = Users;