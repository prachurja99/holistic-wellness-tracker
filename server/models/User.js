const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  about: { type: String, default: '' },
  profileImage: { type: String, default: '' }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// Add this after userSchema definition:
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};
userSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  await this.save();
};


module.exports = mongoose.model('User', userSchema);






