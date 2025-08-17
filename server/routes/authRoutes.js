const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router(); // Initialize router here

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findByEmail(email);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

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
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        about: user.about,
        profileImage: user.profileImage
      },
      message: 'Login successful'
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/profile', protect, async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    about: req.user.about,
    profileImage: req.user.profileImage
  });
});

router.put('/profile', protect, async (req, res) => {
  try {
    const user = req.user;

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (typeof req.body.about !== 'undefined') user.about = req.body.about;
    if (typeof req.body.profileImage !== 'undefined') user.profileImage = req.body.profileImage;
    if (req.body.password) user.password = req.body.password;

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        about: user.about,
        profileImage: user.profileImage
      },
      message: 'Profile updated successfully'
    });
  } catch (err) {
    console.error('Profile update error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;


