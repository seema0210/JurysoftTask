const express = require("express");
const router = express.Router();
const {
    getHabits,
    markHabitDone,
    resetHabit
} = require("../controllers/habit_controller");

// Define the routes
router.get("/habits", getHabits);
router.post("/markHabitDone", markHabitDone);
router.post("/resetHabit", resetHabit);

module.exports = router;