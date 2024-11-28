const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: [{ type: 'ObjectId', ref: 'Task' }],
  user: { type: 'ObjectId', ref: 'User' },
},
{
  timestamps: true,
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = { Plan };