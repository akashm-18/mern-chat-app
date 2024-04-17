import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

import io from 'socket.io-client'

export const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {
    const [socket , setSocket] = useState(null)
    const [onlineusers , setOnlineUsers] = useState([])
    const { authuser } = useAuthContext()

    useEffect(() => {
        if (authuser) {
            // creates the connection
            const socket = io("https://mern-chat-app-akashm.onrender.com/" , {
                query : {
                    userId : authuser._id
                }
            })
            setSocket(socket)

            socket.on("getOnlineUsers" , (users) => {
                setOnlineUsers(users)
            })

            // When the component goes away from the browser(unmounts) , close the connection
            return () => socket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    },[authuser])

    return (
        <SocketContext.Provider value={{socket , onlineusers}}>
            {children}
        </SocketContext.Provider>
    )
}