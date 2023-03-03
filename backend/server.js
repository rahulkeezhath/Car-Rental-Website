const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')
const connectDB = require('./config/db')


const userRoutes = require('./routes/userRouter')
const adminRoutes = require('./routes/adminRouter')
const driverRoutes = require('./routes/driverRouter')
const chatRoutes = require('./routes/chatRouter')
const messageRoute = require('./routes/messageRouter')
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
        origin: "*"
})
)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb'}));

app.use(errorHandler)

// Routes
app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/driver',driverRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoute)




app.listen(port, () =>
console.log(`Server Started on port ${port}`));
