const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')
const connectDB = require('./config/db')
const colors = require('colors')


const userRoutes = require('./routes/userRouter')
const adminRoutes = require('./routes/adminRouter')
const driverRoutes = require('./routes/driverRouter')
const { errorHandler } = require('./middleware/errorMiddleware')

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
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb'}));

app.use(errorHandler)

// Routes
app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/driver',driverRoutes)




app.listen(port, () =>
console.log(`Server Started on port ${port}`.yellow.bold));
