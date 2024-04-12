import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const UseLoginHook = () => {
  const [loading , setLoading] = useState(false) 
  const { setAuthUser } = useAuthContext()

  const login = async (username , password) => {
    const success = checkInputs({username , password})
    if (!success) return;

    setLoading(true)
    try {
        const res = await fetch("http://localhost:3000/api/auth/login" , {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({username , password})
        }) 
        const data = await res.json()

        // Getting the custom error message from the server
        // Throwing the error to the catch block error
        if (data.error) {
            throw new Error(data.error)
        }

        // save user in local storage
        localStorage.setItem("chat-user" , JSON.stringify(data))
        // updating user in context
        setAuthUser(data)
        toast.success("Logged in successfully")

    } catch (error) {
        toast.error(error.message || "error while login")
    } finally {
        setLoading(false)
    }
  }
  return {login , loading}
}

export default UseLoginHook

const checkInputs = ({username , password}) => {
    if (!username || !password) {
        toast.error("Please fill all the fields")
        return false;
    }
    return true;
}