import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectToMongoDb from './db/connectedToMongoDb.js'
import authRoutes from './routes/auth.routes.js'

const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
// ROUTES 

app.use("/api/auth", authRoutes)
app.use("/api/group", groupRoutes) 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectToMongoDb()
    console.log(`Server is running on http://localhost:${PORT}`)
}) 
