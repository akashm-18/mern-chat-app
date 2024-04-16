import React from 'react'
import Conversation from './Conversation'
import UseGetConversationHook from '../../hooks/UseGetConversationHook'
import { getRandomEmoji } from '../../utilis/emojis';

const Conversations =  () => {
  const { conversations , loading } = UseGetConversationHook();
  console.log(conversations)
  console.log(Math.floor(Math.random() * 10))
  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {
        conversations.map((conversation , index) => (
          <Conversation 
            key={conversation._id}
            conversation = {conversation}
            emoji = {getRandomEmoji()}
            lastIndex = {index === conversations.length - 1} 
          />
        ))
      }

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations
