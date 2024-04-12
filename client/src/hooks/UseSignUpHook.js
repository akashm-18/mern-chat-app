import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const UseSignUpHook = () => {
  const [loading , setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()


  const signup = async ({fullName , username , password , confirmpassword , gender}) => {
    const success = handleInputErrors({fullName , username , password , confirmpassword , gender})
    if (!success) return;

    setLoading(true)
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup" , {
        method : "POST",
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify({fullName , username , password , confirmpassword , gender})
      })
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      // Save user in localstorage
      localStorage.setItem("chat-user" , JSON.stringify(data))
      // updating in the context
      setAuthUser(data)

    } catch (error) {
      toast.error(error.message || "Error while signup")
    } finally {
      setLoading(false)
    }

  }
  return {loading , signup}
}

export default UseSignUpHook


const handleInputErrors = ({fullName , username , password , confirmpassword , gender}) => {
  if (!fullName || !username || !password || !confirmpassword || !gender) {
      toast.error("Please fill all the fields")
      return false
  }

  if (password !== confirmpassword) {
    toast.error("Passwords does not match")
    return false
  }

  if (password.length < 6) {
    toast.error("Password length must br greater than 6")
    return false
  }
  return true
}