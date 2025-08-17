const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

router.post('/register', async (req, res) => {
  const { name, email, password, about, profileImage } = req.body;

  const exists = await User.findByEmail(email);
  if (exists) return res.status(400).json({ success: false, message: 'Email already registered' });

  const user = await User.create({ name, email, password, about, profileImage });
  return res.status(201).json({
    success: true,
    user: { id: user._id, name: user.name, email: user.email, about: user.about, profileImage: user.profileImage },
    message: 'Registration successful'
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user) return res.status(400).json({ success: false, message: 'Invalid email or password' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid email or password' });

  await user.updateLastLogin();

  return res.json({
    success: true,
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, about: user.about, profileImage: user.profileImage },
    message: 'Login successful'
  });
});

router.get('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  return res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    about: user.about,
    profileImage: user.profileImage
  });
});

router.put('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.about = typeof req.body.about !== 'undefined' ? req.body.about : user.about;
  user.profileImage = typeof req.body.profileImage !== 'undefined' ? req.body.profileImage : user.profileImage;
  if (req.body.password) user.password = req.body.password;

  const updatedUser = await user.save();

  return res.json({
    success: true,
    user: {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      about: updatedUser.about,
      profileImage: updatedUser.profileImage
    },
    message: 'Profile updated successfully'
  });
});

module.exports = router;




