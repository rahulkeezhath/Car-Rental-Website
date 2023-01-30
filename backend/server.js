const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')
const connectDB = require('./config/db')


const userRoutes = require('./routes/userRouter')
const adminRoutes = require('./routes/adminRouter')

// Database Connection
connectDB(()=>{
    try{
        console.log("Database Successfully Connected");
    } catch (error) {
        console.log("Database Not Connected: ", error);
    }
})

// Middlewares
app.use(
    cors({
        origin: "*"
})
)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb'}));

// Routes
app.use('/users',userRoutes)
app.use('/admin',adminRoutes)




app.listen(port, () =>
console.log(`Server Started on port ${port}`));
