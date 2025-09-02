const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routes/user_route")

const app = express()
app.use(cors())
app.use(express.json())

// mongoose.connect("mongodb://127.0.0.1:27017/CRUD")
mongoose.connect("mongodb://127.0.0.1:27017/CRUD")

app.use('/', userRouter)

app.listen(3001, ()=>{
    console.log('Server is running')
})