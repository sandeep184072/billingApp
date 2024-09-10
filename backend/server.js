const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const axios = require('axios'); // Ensure axios is installed

const app = express();

// Connect to MongoDB
const DB_URI = 'mongodb://localhost:27017/tensorgo';  // Database name is 'tensorgo'
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Enable CORS to allow requests from React frontend
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Configure session middleware
app.use(session({
    secret: 'tensorgo',  // Change this to a strong secret in production
    resave: false,
    saveUninitialized: false,  // Avoid saving empty sessions
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }  // Session lasts for 24 hours
}));

// Initialize Passport for Google OAuth
app.use(passport.initialize());
app.use(passport.session());

// Replace with your Client ID and Secret
require('dotenv').config();  // Load environment variables from .env

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


// Google OAuth Strategy configuration
passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
}, (token, tokenSecret, profile, done) => {
    // Save profile to session
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user);  // Store the user object in the session
});

passport.deserializeUser((obj, done) => {
    console.log('Deserializing user:', obj);
    done(null, obj);  // Retrieve the user from the session
});


// Google OAuth login route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// OAuth callback route
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    console.log('User authenticated via Google:', req.user);  // Log the user object after authentication
    res.redirect('http://localhost:3000/dashboard');  // Redirect to frontend
});

// Mock API to return usage details
const Usage = require('./models/Usage');

app.get('/api/usage', (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'User not authenticated' });

    Usage.findOne({ userId: req.user.id }, (err, usage) => {
        if (err) return res.status(500).json({ error: 'Error fetching usage data' });
        if (!usage) return res.status(404).json({ error: 'No usage data found' });

        res.json(usage);
    });
});

// Mock API to return billing information
const Billing = require('./models/Billing');

app.get('/api/billing', (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'User not authenticated' });

    Billing.findOne({ userId: req.user.id }, (err, billing) => {
        if (err) return res.status(500).json({ error: 'Error fetching billing data' });
        if (!billing) return res.status(404).json({ error: 'No billing data found' });

        res.json(billing);
    });
});

// Zapier endpoint for invoice generation (mocked for now)
app.post('/api/invoice', passport.authenticate('session'), (req, res) => {
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/20052934/2h2dkm2/';

    // Fallback for req.user if undefined
    const userId = req.user ? req.user.id : 'guest-user';

    const invoiceData = {
        userId,  // Using the fallback or actual user ID
        totalUsage: '$1000',
        billingCycle: 'Sept 2024',
        invoiceDate: new Date().toISOString(),
        recipient_email: 'john.doe@example.com',
        recipient_name: 'John Doe'
    };

    // Send the invoice data to the Zapier webhook
    axios.post(zapierWebhookUrl, invoiceData)
        .then(response => {
            console.log('Invoice sent to Zapier successfully');
            res.json({ success: true, invoiceId: response.data.id });
        })
        .catch(error => {
            console.error('Error sending invoice to Zapier:', error);
            res.status(500).json({ error: 'Invoice generation failed' });
        });
});


// Start the server
app.listen(5000, () => console.log('Backend server running on http://localhost:5000'));