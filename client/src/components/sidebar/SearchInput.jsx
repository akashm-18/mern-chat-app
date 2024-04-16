import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import UseGetConversationHook from '../../hooks/UseGetConversationHook';
import toast from 'react-hot-toast';


const SearchInput = () => {
  const [searchTerm , setSearchTerm] = useState("")
  const { setSelectedConversation } = useConversation()
  const {conversations} = UseGetConversationHook()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchTerm) return;
    if (searchTerm.length < 3) {
      return toast.error("Search term must be atleast 3 characters long")
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(searchTerm.toLowerCase()))

    if (conversation) {
      setSelectedConversation(conversation)
      setSearchTerm("")
    } else {
      toast.error("No such user found!")
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type="text" placeholder='Search...' className='input input-bordered rounded-full' 
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearch className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default SearchInput


