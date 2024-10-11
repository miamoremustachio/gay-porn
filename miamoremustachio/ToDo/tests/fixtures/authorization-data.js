const mongoose = require('mongoose');

const TASK_ID = '65633d765d1d06dcad8ff7d0';
const RANDOM_ID = new mongoose.Types.ObjectId().toString();

module.exports = {
  TASK_ID,
  RANDOM_ID,
};