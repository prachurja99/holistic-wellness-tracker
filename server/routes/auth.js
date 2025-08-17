router.put('/profile', protect, async (req, res) => {
  try {
    console.log('profileImage received:', req.body.profileImage ? req.body.profileImage.slice(0, 30) : req.body.profileImage);

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (typeof req.body.about !== 'undefined') user.about = req.body.about;
    if (typeof req.body.profileImage !== 'undefined') user.profileImage = req.body.profileImage;

    await user.save();

    console.log('user.profileImage saved:', user.profileImage ? user.profileImage.slice(0, 30) : user.profileImage);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        about: user.about,
        profileImage: user.profileImage,
      },
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});





