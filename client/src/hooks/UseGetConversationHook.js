import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const UseGetConversationHook = () => {
  const [loading , setLoading] = useState(false)
  const [conversations , setConversations] = useState([])

  useEffect(() => {
    const getConversations = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/users" , {
                method : "GET"
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setConversations(data)
        } catch (error) {
            toast.error(error.message || "Error while fetching conversations")
        } finally {
            setLoading(false)
        }
    }
    getConversations()
  } , [])

  return { conversations , loading};

}

export default UseGetConversationHook
