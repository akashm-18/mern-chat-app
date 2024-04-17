import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const app = express()

const server = http.createServer(app)
const io = new Server(server , {
    cors : {
        origin : ["http://localhost:7000"],
        methods : ["GET" , "POST"]
    }
})

const userSocketMap = {}  // {userId : socketId}

// Returns the socket id of the user
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

io.on("connection" , (socket) => {
    console.log("User connected" , socket.id)

    const userId = socket.handshake.query.userId
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id
    }

    // send events to all connected clients
    io.emit("getOnlineUsers" , Object.keys(userSocketMap))

    // socket.on() used to listen to the events. can be used both on client and server side
    socket.on("disconnect" , () => {
        console.log("used disconnected" , socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers" , Object.keys(userSocketMap))
    })
})


export {app , io , server}