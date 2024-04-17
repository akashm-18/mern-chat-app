import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages} from 'react-icons/ti'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'

const MessageContainer = () => {

  const {selectedConversation , setSelectedConversation}  = useConversation();
  const nochat = selectedConversation;

  useEffect(() => {
    // clean up function (this function unmounts the component)
    // When this component removes from browser then this component unmounted 
    // means when component goes this function works
    return () => setSelectedConversation(null)
  } , [setSelectedConversation])

  return (
    <div className='md:min-w-[450px] flex flex-col'>

      { nochat ?  (
        <>
        {/* Header */}
        <div className='bg-slate-500 px-4 py-2 mb-2 flex gap-2 flex-row items-center justify-center'>
          <span className='label-text'>To:</span>
          <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
        </div>
  
        <Messages />
        <MessageInput />
  
        </>
      ) : ( <NoChatSelected /> ) }

    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
  const {authuser} = useAuthContext()
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authuser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}
