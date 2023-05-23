const { Schema, model } = require('mongoose');

const todoSchema = new Schema(
  {
    description: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true, collection: 'todo' }
);

module.exports = model('Todo', todoSchema);
