import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'
import useConversation from '../zustand/useConversation.js'

const UseLogoutHook = () => {
  const {setSelectedConversation} = useConversation()
  const [loading , setLoading] = useState(false)
  const {setAuthUser} = useAuthContext()

  const logout = async () => {
    setLoading(true)

    try {
        const res = await fetch("/api/auth/logout" , {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
        })

        const data = await res.json()
        if (data.error) {
            throw new Error(data.error)
        }

        // Remove user from localstorage
        localStorage.removeItem("chat-user")
        setAuthUser(null)

        // one way but i unmount the component 
        // setSelectedConversation(null)

    } catch (error) {
        toast.error("error.message")
    } finally {
        setLoading(false)
    }
  }

  return {logout , loading}
}

export default UseLogoutHook
