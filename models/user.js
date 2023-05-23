const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const envVars = require('../config/envVars');

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true, select: false }
  },
  { timestamps: true, collection: 'user' }
);

userSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, envVars.SALT_ROUNDS);
  this.password = hashedPassword;
  next();
});

module.exports = model('User', userSchema);
