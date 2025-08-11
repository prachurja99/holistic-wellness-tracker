const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Helper: generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const exists = await User.findByEmail(email);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create new user - password hashing handled by pre-save hook
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      message: 'Registration successful'
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user & return token
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    await user.updateLastLogin();

    res.json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
      message: 'Login successful'
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * @route   GET /api/auth/profile
 * @desc    Get logged-in user's profile
 */
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

/**
 * @route   PUT /api/auth/profile
 * @desc    Update logged-in user's profile
 */
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // If password provided, will be hashed by pre-save hook
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email },
      message: 'Profile updated successfully'
    });
  } catch (err) {
    console.error('Profile update error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
