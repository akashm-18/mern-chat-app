import React from 'react'

const Conversation = () => {
  return (
    <>
      <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>

        <div className='avatar online'>
          <div className='w-12 rounded-full'>
            <img src="https://cdn4.iconfinder.com/data/icons/top-search-6/128/_user_account_profile_head_person_avatar-512.png" alt="user avatar" />
          </div>
        </div>

        <div className='flex flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>John Doe</p>
            <span className='text-xl'>👻</span>
          </div>
        </div>
      </div> 

      <div className='divider my-0 py-0 h-1'></div>

    </>
  )
}

export default Conversation
