import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
            <img src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuT2xIVpIKBiNl_0jSgQzzq4lv9gDyG6JjKj3zThUwT_rzBm355WxiRBL_2Mu--VQoq8s&usqp=CAU"
            } alt="chat bubble" />
        </div>
      </div>
    
    <div className={`chat-bubble text-white bg-blue-500`}>Hi ! Whats up?</div>
    <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12.42</div>

    </div>
  )
}

export default Message
