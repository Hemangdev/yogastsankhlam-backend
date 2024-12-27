const express = require('express');
const session = require('express-session');

const router = express.Router();

// Dummy credentials
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'password123';

// Session setup middleware
const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
});

// POST /auth/login - Handle login logic
router.post('/admin', (req, res) => {
    const { username, password } = req.body;

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        req.session.isAuthenticated = true; // Set authenticated flag in session
        return res.json({ success: true, message: 'Login successful', redirect: '/admin/dashboard' });
    } else {
        return res.json({ success: false, message: 'Invalid username or password' });
    }
});

// GET /auth/admin - Admin dashboard access
router.get('/admin/dashboard', (req, res) => {
    if (req.session && req.session.isAuthenticated) {
        return res.json({ success: true, message: 'Welcome to the admin page!' });
    } else {
        return res.status(401).json({ success: false, message: 'Unauthorized. Please log in first.' });
    }
});

// GET /auth/logout - Logout user
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.json({ success: false, message: 'Error logging out' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Export both router and session middleware
module.exports = { authRouter: router, sessionMiddleware };
