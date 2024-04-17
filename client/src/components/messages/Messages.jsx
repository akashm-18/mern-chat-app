import React, { useEffect, useRef } from 'react'
import UseGetMessagesHook from '../../hooks/UseGetMessagesHook'
import MessageSkeleton from '../skeleton/MessageSkeleton'
import Message from './Message.jsx'
import UseListenMessageHook from '../../hooks/UseListenMessageHook.js'

const Messages = () => {
  const { messages , loading } = UseGetMessagesHook()
  const lastMessageRef = useRef()
  UseListenMessageHook()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior : "smooth"})
    } , 100)
  } , [messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>

      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
        <Message  message={message} />
        </div>
      ))}

      {!loading && messages.length === 0 && (
        <p className='text-center'>send a message to start conversation</p>
      )}
      {loading &&  [...Array(3)].map((_ , index) => <MessageSkeleton key={index} /> ) }
    </div>
  )
}

export default Messages
