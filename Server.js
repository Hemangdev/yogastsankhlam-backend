const express = require('express');
const bodyParser = require('body-parser');
const { authRouter, sessionMiddleware } = require('./Auth/Login');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:5174', // Local development frontend
    'https://yogastsankhlam.vercel.app', // Your production frontend URL
    // Add other origins here if needed
  ];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware); // Use session middleware


app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // Allow the origin if it's in the allowed list or no origin is provided (for non-browser requests)
        callback(null, true);
      } else {
        // Reject the request if the origin is not allowed
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true, // Allow cookies
  }));

// Routes
app.use('/auth', authRouter); // All authentication and admin routes

// Default Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the server!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
