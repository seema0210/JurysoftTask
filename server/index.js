const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/HABIT")
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log("MongoDB connection error:", err))

// Add a test route to verify the server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Import and use habit routes
const habitRouter = require("./routes/habit_route")
app.use('/', habitRouter)

// Start server
app.listen(3001, () => {
    console.log('Server is running on port 3001')
})