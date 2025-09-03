const express = require('express');
const router = express.Router();
const {
  getHabits,
  markHabitDone,
  resetHabit
} = require('../controllers/habit_controller');

// Define the routes without /api prefix
router.get('/', getHabits);
router.post('/create', markHabitDone);
router.delete('/delete/:id', resetHabit);

module.exports = router;