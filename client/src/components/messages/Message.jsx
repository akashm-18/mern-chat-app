import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'
import { extractTime } from '../../utilis/extractTime'

const Message = ({message}) => {
  const { authuser } = useAuthContext()
  const { selectedConversation } = useConversation()
  const fromMe = message.senderId === authuser._id
  const chatClassname = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? authuser.profilePic : selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : ''
  const formattedTime = extractTime(message.createdAt)

  return (
    <div className={`chat ${chatClassname}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
            <img src={profilePic}  alt="chat bubble" />
        </div>
      </div>
    
    <div className={`chat-bubble text-white  ${bubbleBgColor}`}>{message.message}</div>
    <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>

    </div>
  )
}

export default Message
