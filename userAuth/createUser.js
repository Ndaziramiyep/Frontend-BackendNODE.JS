const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'example_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

const username = 'testuser';
const password = 'password123';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hash], (err, result) => {
        if (err) throw err;
        console.log('User created');
        db.end();
    });
});
