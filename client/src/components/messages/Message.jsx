import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'

const Message = ({message}) => {
  const { authuser } = useAuthContext()
  const { selectedConversation } = useConversation()
  const fromMe = message.senderId === authuser._id
  const chatClassname = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? authuser.profilePic : selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : ''

  return (
    <div className={`chat ${chatClassname}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
            <img src={profilePic}  alt="chat bubble" />
        </div>
      </div>
    
    <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor}`}>{message.message}</div>
    <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{message.createdAt}</div>

    </div>
  )
}

export default Message
