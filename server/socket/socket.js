import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const app = express()

const server = http.createServer(app)
const io = new Server(server , {
    cors : {
        origin : ["http://localhost:3000"],
        methods : ["GET" , "POST"]
    }
})

io.on("connection" , (socket) => {
    console.log("User connected" , socket.id)

    // socket.on() used to listen to the events. can be used both on client and server side
    socket.on("disconnect" , () => {
        console.log("used disconnected" , socket.id)
    })
})


export {app , io , server}