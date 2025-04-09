const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  category: {
    type: String,
    trim: true,
    default: 'Uncategorized'
  }
}, {
  timestamps: true
});

// Index for faster queries
expenseSchema.index({ user: 1, createdAt: -1 });

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;