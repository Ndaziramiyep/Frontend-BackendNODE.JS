const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'customers'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

let activeUsers = {};  // Track active users

// Middleware to track active users
app.use((req, res, next) => {
  if (req.session.userId) {
    activeUsers[req.session.userId] = req.session.username;
  }
  next();
});

// Render registration form
app.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration form submission
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query('INSERT INTO clients (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

// Render login form
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM clients WHERE username = ?', [username], async (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const isMatch = await bcrypt.compare(password, results[0].password);
      if (isMatch) {
        req.session.userId = results[0].id;
        req.session.username = username;
        activeUsers[results[0].id] = username;
        res.redirect('/dashboard');
      } else {
        res.send('Invalid credentials');
      }
    } else {
      res.send('Invalid credentials');
    }
  });
});

// Render user dashboard
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('dashboard', { username: req.session.username });
});

// Render admin dashboard
app.get('/admin', (req, res) => {
  if (!req.session.userId || req.session.username !== 'admin') {
    return res.redirect('/login');
  }
  res.render('admin', { activeUsers, activeUserCount: Object.keys(activeUsers).length });
});

// Handle logout
app.get('/logout', (req, res) => {
  delete activeUsers[req.session.userId];
  req.session.destroy();
  res.redirect('/login');
});

// Admin logout user
app.post('/admin/logout', (req, res) => {
  const { userId } = req.body;
  delete activeUsers[userId];
  res.redirect('/admin');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

















// const express = require('express');
// const mysql = require('mysql2');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt');
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(session({
//     secret: 'secret-key',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 60000 } // 1-minute session for demo purposes
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

// let activeUsers = new Set(); // Set to keep track of active users

// const isAuthenticated = (req, res, next) => {
//     if (req.session.userId) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// };

// const checkCookieConsent = (req, res, next) => {
//     if (req.cookies.cookieConsent === 'accepted') {
//         next();
//     } else {
//         res.redirect('/cookie-consent');
//     }
// };

// app.set('view engine', 'ejs');

// app.get('/cookie-consent', (req, res) => {
//     res.render('cookie-consent');
// });

// app.post('/cookie-consent', (req, res) => {
//     const consent = req.body.consent;
//     if (consent === 'accept') {
//         res.cookie('cookieConsent', 'accepted', { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
//     } else {
//         res.cookie('cookieConsent', 'rejected', { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
//     }
//     res.redirect('/login');
// });

// app.get('/login', checkCookieConsent, (req, res) => {
//     res.render('login');
// });

// app.post('/login', checkCookieConsent, (req, res) => {
//     const { username, password } = req.body;
//     const query = 'SELECT * FROM clients WHERE username = ?';

//     db.query(query, [username], async (err, results) => {
//         if (err) throw err;

//         if (results.length > 0) {
//             const user = results[0];
//             const match = await bcrypt.compare(password, user.password);

//             if (match) {
//                 req.session.userId = user.id;
//                 req.session.username = user.username;
//                 activeUsers.add(user.username); // Add user to active users list
//                 res.redirect('/dashboard');
//             } else {
//                 res.send('Invalid credentials');
//             }
//         } else {
//             res.send('User not found');
//         }
//     });
// });

// app.get('/dashboard', isAuthenticated, (req, res) => {
//     res.render('dashboard', { userId: req.session.userId, username: req.session.username, activeUsers: Array.from(activeUsers) });
// });

// app.get('/logout', (req, res) => {
//     if (req.session.username) {
//         activeUsers.delete(req.session.username); // Remove user from active users list
//     }
//     req.session.destroy((err) => {
//         if (err) throw err;
//         res.redirect('/login');
//     });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
