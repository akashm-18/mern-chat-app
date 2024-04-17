import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors"

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDb from './db/connectToMongo.js'
import { app, server } from './socket/socket.js'

dotenv.config()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     origin: 'http://localhost:7000',
//   }));

app.use('/api/auth' , authRoutes)
app.use('/api/messages' , messageRoutes)
app.use('/api/users' , userRoutes)

server.listen(PORT , () => {
    connectToMongoDb()
    console.log(`server running on Port ${PORT}`)
})

