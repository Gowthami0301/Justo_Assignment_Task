const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = 'jwt';
const ONE_TIME_LINK_EXPIRATION = 10 * 60 * 1000; // 10 minutes
const MAX_FAILED_ATTEMPTS = 5; // Configurable

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (password.length < 5) return res.status(400).json({ error: 'Password too short' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.status(403).json({ error: 'Account locked. Try again later.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            user.failedLoginAttempts += 1;
            if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
                user.lockUntil = Date.now() + 15 * 60 * 1000; // Lock account for 15 minutes
            }
            await user.save();
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        user.failedLoginAttempts = 0;
        user.lockUntil = null;
        await user.save();

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getTime = async (req, res) => {
    const token = req.headers['authorization'];

    try {
        if (!token) return res.status(401).json({ error: 'No token provided' });

        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) return res.status(401).json({ error: 'Invalid token' });

        res.json({ time: new Date().toISOString() });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

exports.kickout = async (req, res) => {
    const { username } = req.body;

    try {
        await User.updateMany({ username }, { $set: { tokens: [] } });
        res.json({ message: 'User kicked out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.generateOneTimeLink = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const token = crypto.randomBytes(20).toString('hex');
        user.tokens.push(token);
        await user.save();

        setTimeout(() => {
            user.tokens = user.tokens.filter(t => t !== token);
            user.save();
        }, ONE_TIME_LINK_EXPIRATION);

        res.json({ link: `http://localhost:3000/validate/${token}` });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.validateOneTimeLink = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ tokens: token });
        if (!user) return res.status(400).json({ error: 'Invalid or expired link' });

        user.tokens = user.tokens.filter(t => t !== token);
        await user.save();

        const authToken = generateToken(user);
        res.json({ token: authToken });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
