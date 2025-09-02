const HabitModel = require("../models/habit")

const getHabits = async (req, res) => {
    try {
        const habits = await HabitModel.find({});
        res.json(habits);
    } catch (error) {
        console.log('get habits error:', error);
        res.status(500).json({ error: 'Failed to fetch habits' });
    }
}

const markHabitDone = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const habitName = "Drink Water"; // Fixed habit name
        
        // Find or create the habit
        let habit = await HabitModel.findOne({ name: habitName });
        
        if (!habit) {
            // Create new habit if it doesn't exist
            habit = new HabitModel({
                name: habitName,
                dates: [today]
            });
            await habit.save();
        } else {
            // Check if date already exists
            if (!habit.dates.includes(today)) {
                habit.dates.push(today);
                habit.dates.sort(); // Keep dates sorted
                await habit.save();
            }
        }

        const habits = await HabitModel.find({});
        res.json({ message: 'Habit marked as done for today!', habits });
    } catch (error) {
        console.log('mark habit done error:', error);
        res.status(500).json({ error: 'Failed to mark habit as done' });
    }
}

const resetHabit = async (req, res) => {
    try {
        const habitName = "Drink Water"; // Fixed habit name
        
        // Delete the habit
        await HabitModel.deleteOne({ name: habitName });
        
        const habits = await HabitModel.find({});
        res.json({ message: 'Habit data reset successfully!', habits });
    } catch (error) {
        console.log('reset habit error:', error);
        res.status(500).json({ error: 'Failed to reset habit data' });
    }
}

module.exports = {
    getHabits,
    markHabitDone,
    resetHabit
}