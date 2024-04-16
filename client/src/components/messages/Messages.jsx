import React from 'react'
import UseGetMessagesHook from '../../hooks/UseGetMessagesHook'
import MessageSkeleton from '../skeleton/MessageSkeleton'
import Message from './Message.jsx'

const Messages = () => {
  const { messages , loading } = UseGetMessagesHook()
  console.log(messages)
  return (
    <div className='px-4 flex-1 overflow-auto'>

      {!loading && messages.length > 0 && messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}

      {!loading && messages.length === 0 && (
        <p className='text-center'>send a message to start conversation</p>
      )}
      {loading &&  [...Array(3)].map((_ , index) => <MessageSkeleton key={index} /> ) }
    </div>
  )
}

export default Messages
