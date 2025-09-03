const mongoose = require('mongoose')

const HabitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Drink Water"
    },
    dates: [{
        type: String,
        required: true
    }]
})

const HabitModel = mongoose.model("habit", HabitSchema)
module.exports = HabitModel