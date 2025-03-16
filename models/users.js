const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class Users {
    // Method to find a user by username and password
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
}




module.exports = Users;