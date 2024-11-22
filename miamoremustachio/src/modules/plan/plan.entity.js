const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  tasks: [{
    type: 'ObjectId',
    ref: 'Task',
  }],  
  userId: {
    type: 'ObjectId',
    ref: 'User',
  },
});

const PlanEntity = mongoose.model('Plan', planSchema);

module.exports = PlanEntity;
