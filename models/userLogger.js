const { Schema, model } = require('mongoose');

const userLoggerSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    expiresAt: { type: Date, required: true }
  },
  { collection: 'user_logger' }
);

module.exports = model('UserLogger', userLoggerSchema);
