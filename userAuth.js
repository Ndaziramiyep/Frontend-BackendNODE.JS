const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 180000 } // 3-minute session for demo purposes
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'customers'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

const checkCookieConsent = (req, res, next) => {
    if (req.cookies.cookieConsent === 'accepted') {
        next();
    } else {
        res.redirect('/cookie-consent');
    }
};

app.set('view engine', 'ejs');

app.get('/cookie-consent', (req, res) => {
    res.render('cookie-consent');
});

app.post('/cookie-consent', (req, res) => {
    const consent = req.body.consent;
    if (consent === 'accept') {
        res.cookie('cookieConsent', 'accepted', { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    } else {
        res.cookie('cookieConsent', 'rejected', { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    }
    res.redirect('/login');
});

app.get('/login', checkCookieConsent, (req, res) => {
    res.render('login');
});

app.post('/login', checkCookieConsent, (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';

    db.query(query, [username], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                req.session.userId = user.id;
                res.redirect('/dashboard');
            } else {
                res.send('Invalid credentials');
            }
        } else {
            res.send('User not found');
        }
    });
});

app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`Welcome to the dashboard, user ${req.session.userId}`);
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});






























// const express = require('express');
// const mysql = require('mysql2');
// const session = require('express-session');
// const bcrypt = require('bcrypt');
// const app = express();

// app.use(express.urlencoded({ extended: true }));

// app.use(session({
//     secret: 'secret-key',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 180000 } // 1-minute session for demo purposes
// }));

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'customers'
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to database');
// });

// // Middleware to check if user is authenticated
// const isAuthenticated = (req, res, next) => {
//     if (req.session.userId) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// };

// app.set('view engine', 'ejs');

// // Render login form
// app.get('/login', (req, res) => {
//     res.render('login');
// });

// // Handle login
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const query = 'SELECT * FROM clients WHERE username = ?';

//     db.query(query, [username], async (err, results) => {
//         if (err) throw err;

//         if (results.length > 0) {
//             const user = results[0];
//             const match = await bcrypt.compare(password, user.password);

//             if (match) {
//                 req.session.userId = user.id;
//                 res.redirect('/dashboard');
//             } else {
//                 res.send('Invalid credentials');
//             }
//         } else {
//             res.send('User not found');
//         }
//     });
// });

// // Render dashboard for authenticated clients
// app.get('/dashboard', isAuthenticated, (req, res) => {
//     res.send(`Welcome to the dashboard, user ${req.session.userId}`);
// });

// // Handle logout
// app.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) throw err;
//         res.redirect('/login');
//     });
// });




// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
