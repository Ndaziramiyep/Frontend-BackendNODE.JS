const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

// Set up the session middleware
app.use(session({
    secret: 'your_secret_key', // Secret key for signing the session ID cookie
    resave: false, // Do not save session if unmodified
    saveUninitialized: true, // Save uninitialized sessions
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Route to set a session variable
app.get('/set-session', (req, res) => {
    req.session.username = 'JohnDoe';
    res.send('Session variable set: username = JohnDoe');
});

// Route to get the session variable
app.get('/get-session', (req, res) => {
    if (req.session.username) {
        res.send(`Session variable value: username = ${req.session.username}`);
    } else {
        res.send('No session variable found');
    }
});

// Route to destroy the session
app.get('/destroy-session', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error destroying session');
        }
        res.send('Session destroyed');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
